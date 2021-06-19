
let headX = 100;
let headY = 100;
const radius = 25;
let degree = 90;
let oldDegree = null;
const speed = 3;
const rotationDegree = 2;
const traceQueue = []

let preHeadX, preHeadY;

function setup() {
    const canvasWidth = windowWidth * 0.9;
    const canvasHeight = windowHeight * 0.9;
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.position((windowWidth - canvasWidth) / 2, (windowHeight - canvasHeight) / 2);

    angleMode(DEGREES);

    // traceQueue.push({x: headX, y: headY});

    preHeadX = headX, preHeadY = headY;
}

function draw() {
    clear();

    if (keyIsPressed) {
        degreeChangeByKey();
        // if (oldDegree != degree) {
        //     oldDegree = degree;
        //     traceQueue.push({x: headX, y: headY});
        // }
    }

    if (0 < headX - radius && headX + radius < width && 0 < headY - radius && headY + radius < height) {
        headX += speed * cos(degree);
        headY += speed * sin(degree);
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
    ellipse(headX, headY, radius * 2);

    let bodyX, bodyY;

    if (preHeadX === headX) {
        const tmpBodyY1 = headY - radius * 2;
        const tmpBodyY2 = headY + radius * 2;

        let minY, maxY;
        if (preHeadY < headY) {
            minY = preHeadY;
            maxY = headY;
        }
        else {
            minY = headY;
            maxY = preHeadY;
        }
        if (minY <= tmpBodyY1 && tmpBodyY1 <= maxY) {
            bodyY = tmpBodyY1;
        }
        else if (minY <= tmpBodyY2 && tmpBodyY2 <= maxY) {
            bodyY = tmpBodyY2;
        }
        else {
            return;
        }
        bodyX = headX;
    }
    else {
        const a = (headY - preHeadY) / (headX - preHeadX);
        const b = headY - a * headX;
        const c = headX;
        const d = headY;
        const r = radius * 2;
        const A = pow(a, 2) + 1;
        const B = a * (b - d) - c;
        const C = pow(b - d, 2) + pow(c, 2) - pow(r, 2);

        const D = sqrt(pow(B, 2) - A * C);

        if (Number.isNaN(D)) {
            return;
        }

        const tmpBodyX1 = (-B - D) / A;
        const tmpBodyX2 = (-B + D) / A;

        let minX, maxX;
        if (preHeadX < headX) {
            minX = preHeadX;
            maxX = headX;
        }
        else {
            minX = headX;
            maxX = preHeadX;
        }
        if (minX <= tmpBodyX1 && tmpBodyX1 <= maxX) {
            bodyX = tmpBodyX1;
        }
        else if (minX <= tmpBodyX2 && tmpBodyX2 <= maxX) {
            bodyX = tmpBodyX2;
        }
        else {
            return;
        }
        bodyY = a * bodyX + b;
    }

    ellipse(bodyX, bodyY, radius * 2);
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


