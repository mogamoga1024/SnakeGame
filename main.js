
let headPotision = {x: 100, y: 100};
const radius = 25;
let degree = 90;
let oldDegree = null;
const speed = 3;
const rotationDegree = 2;
const traceQueue = []
let preHeadPotision;

function setup() {
    const canvasWidth = windowWidth * 0.9;
    const canvasHeight = windowHeight * 0.9;
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.position((windowWidth - canvasWidth) / 2, (windowHeight - canvasHeight) / 2);

    angleMode(DEGREES);

    // traceQueue.push(headPotision);

    preHeadPotision = {x: headPotision.x, y: headPotision.y}
}

function draw() {
    clear();

    if (keyIsPressed) {
        degreeChangeByKey();
        // if (oldDegree != degree) {
        //     oldDegree = degree;
        //     traceQueue.push(headPotision);
        // }
    }

    if (0 < headPotision.x - radius && headPotision.x + radius < width && 0 < headPotision.y - radius && headPotision.y + radius < height) {
        headPotision.x += speed * cos(degree);
        headPotision.y += speed * sin(degree);
    }
    else {
        noLoop();
    }

    // push();
    // stroke(255, 0, 0);
    // strokeWeight(radius);
    // for (let i = 0; i < traceQueue.length; i++) {
    //     point(traceQueue[i].x, traceQueue[i].y);
    // }
    // pop();

    fill(0, 200, 0);
    ellipse(headPotision.x, headPotision.y, radius * 2);

    const backBodyPosition = getBackBodyPosition(headPotision, headPotision, preHeadPotision);    

    if (backBodyPosition != null) {
        ellipse(backBodyPosition.x, backBodyPosition.y, radius * 2);
    }
}

function degreeChangeByKey() {
    let plusRotateConditions, minusRotateConditions;

    if (keyCode === UP_ARROW) {
        plusRotateConditions = isLeftSide;
        minusRotateConditions = isRightSide;
    }
    else if (keyCode === DOWN_ARROW) {
        plusRotateConditions = isRightSide;
        minusRotateConditions = isLeftSide;
    }
    else if (keyCode === RIGHT_ARROW) {
        plusRotateConditions = isLowerSide;
        minusRotateConditions = isUpperSide;
    }
    else if (keyCode === LEFT_ARROW) {
        plusRotateConditions = isUpperSide;
        minusRotateConditions = isLowerSide;
    }
    else {
        return;
    }

    if (plusRotateConditions(degree)) {
        degree = plusRotate(degree);
    }
    else if (minusRotateConditions(degree)) {
        degree = minusRotate(degree);
    }
}

function isUpperSide(degree) {
    return 0 < degree && degree < 180;
}

function isLowerSide(degree) {
    return 180 < degree;
}

function isLeftSide(degree) {
    return 90 < degree && degree < 270;
}

function isRightSide(degree) {
    return 270 < degree || degree < 90;
}

function plusRotate(degree) {
    return (degree + rotationDegree) % 360;
}
function minusRotate(degree) {
    return (degree - rotationDegree + 360) % 360;
}

function getBackBodyPosition(basePosition, locusPoint1, locusPoint2) {
    let backBodyX, backBodyY;

    if (locusPoint2.x === locusPoint1.x) {
        const tmpBodyY1 = basePosition.y - radius * 2;
        const tmpBodyY2 = basePosition.y + radius * 2;

        let minY, maxY;
        if (locusPoint2.y < locusPoint1.y) {
            minY = locusPoint2.y;
            maxY = locusPoint1.y;
        }
        else {
            minY = locusPoint1.y;
            maxY = locusPoint2.y;
        }
        if (minY <= tmpBodyY1 && tmpBodyY1 <= maxY) {
            backBodyY = tmpBodyY1;
        }
        else if (minY <= tmpBodyY2 && tmpBodyY2 <= maxY) {
            backBodyY = tmpBodyY2;
        }
        else {
            return null;
        }
        backBodyX = locusPoint1.x;
    }
    else {
        const a = (locusPoint1.y - locusPoint2.y) / (locusPoint1.x - locusPoint2.x);
        const b = locusPoint1.y - a * locusPoint1.x;
        const c = basePosition.x;
        const d = basePosition.y;
        const r = radius * 2;
        const A = pow(a, 2) + 1;
        const B = a * (b - d) - c;
        const C = pow(b - d, 2) + pow(c, 2) - pow(r, 2);

        const D = sqrt(pow(B, 2) - A * C);

        if (Number.isNaN(D)) {
            return null;
        }

        const tmpBodyX1 = (-B - D) / A;
        const tmpBodyX2 = (-B + D) / A;

        let minX, maxX;
        if (locusPoint2.x < locusPoint1.x) {
            minX = locusPoint2.x;
            maxX = locusPoint1.x;
        }
        else {
            minX = locusPoint1.x;
            maxX = locusPoint2.x;
        }
        if (minX <= tmpBodyX1 && tmpBodyX1 <= maxX) {
            backBodyX = tmpBodyX1;
        }
        else if (minX <= tmpBodyX2 && tmpBodyX2 <= maxX) {
            backBodyX = tmpBodyX2;
        }
        else {
            return null;
        }
        backBodyY = a * backBodyX + b;
    }

    return {x: backBodyX, y: backBodyY};
}
