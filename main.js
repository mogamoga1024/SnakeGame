
let headPotision = {x: 100, y: 100};
const radius = 25;
let degree = 90;
let oldDegree = null;
const speed = 3;
const rotationDegree = 2;
const traceQueue = []

function setup() {
    const canvasWidth = windowWidth * 0.9;
    const canvasHeight = windowHeight * 0.9;
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.position((windowWidth - canvasWidth) / 2, (windowHeight - canvasHeight) / 2);

    angleMode(DEGREES);

    traceQueue.push({x: headPotision.x, y: headPotision.y});
}

function draw() {
    //clear();
    background(128, 128, 128);

    if (keyIsPressed) {
        degreeChangeByKey();
        if (oldDegree != degree) {
            oldDegree = degree;
            traceQueue.push({x: headPotision.x, y: headPotision.y});
        }
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

    let basePosition = headPotision;
    let traceQueueIndex = traceQueue.length - 1;

    for (let bodyCount = 0; bodyCount < 5; bodyCount++) {

        let backBodyPosition = null;
        while (traceQueueIndex >= 0) {
            let locusFrontPoint;
            if (traceQueueIndex === traceQueue.length - 1) {
                locusFrontPoint = basePosition;
            }
            else {
                locusFrontPoint = traceQueue[traceQueueIndex + 1];
            }

            const locusBackPoint = traceQueue[traceQueueIndex];

            backBodyPosition = getBackBodyPosition(basePosition, locusFrontPoint, locusBackPoint);

            if (backBodyPosition != null) {
                if (bodyCount === 4) { // debug code
                    if (dist(backBodyPosition.x, backBodyPosition.y, headPotision.x, headPotision.y) < radius * 2 + 0.5) {
                        throw new Error("bug");
                    }
                }
                break;
            }

            traceQueueIndex--;
        }

        if (backBodyPosition != null) {
            fill(100, 200 * (1 - bodyCount / 6), 100);

            ellipse(backBodyPosition.x, backBodyPosition.y, radius * 2);
        }
        else {
            break;
        }

        basePosition = backBodyPosition;
    }

    if (traceQueueIndex > 0) {
        traceQueue.splice(0, traceQueueIndex - 1);
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

function getBackBodyPosition(basePosition, locusFrontPoint, locusBackPoint) {
    let backBodyX, backBodyY;

    if (locusBackPoint.x === locusFrontPoint.x) {
        const tmpBodyY1 = basePosition.y - radius * 2;
        const tmpBodyY2 = basePosition.y + radius * 2;

        let minY, maxY;
        if (locusBackPoint.y < locusFrontPoint.y) {
            minY = locusBackPoint.y;
            maxY = locusFrontPoint.y;
        }
        else {
            minY = locusFrontPoint.y;
            maxY = locusBackPoint.y;
        }

        let existsTmpBodyY1InLocus = minY <= tmpBodyY1 && tmpBodyY1 <= maxY;
        let existsTmpBodyY2InLocus = minY <= tmpBodyY2 && tmpBodyY2 <= maxY;

        if (existsTmpBodyY1InLocus && existsTmpBodyY2InLocus) {
            if (abs(locusBackPoint.y - tmpBodyY1) < abs(locusBackPoint.y - tmpBodyY2)) {
                backBodyY = tmpBodyY1;
            }
            else {
                backBodyY = tmpBodyY2;
            }
        }
        else if (existsTmpBodyY1InLocus) {
            backBodyY = tmpBodyY1;
        }
        else if (existsTmpBodyY2InLocus) {
            backBodyY = tmpBodyY2;
        }
        else {
            return null;
        }

        backBodyX = locusFrontPoint.x;
    }
    else {
        const a = (locusFrontPoint.y - locusBackPoint.y) / (locusFrontPoint.x - locusBackPoint.x);
        const b = locusFrontPoint.y - a * locusFrontPoint.x;
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
        if (locusBackPoint.x < locusFrontPoint.x) {
            minX = locusBackPoint.x;
            maxX = locusFrontPoint.x;
        }
        else {
            minX = locusFrontPoint.x;
            maxX = locusBackPoint.x;
        }

        let existsTmpBodyX1InLocus = minX <= tmpBodyX1 && tmpBodyX1 <= maxX;
        let existsTmpBodyX2InLocus = minX <= tmpBodyX2 && tmpBodyX2 <= maxX;

        if (existsTmpBodyX1InLocus && existsTmpBodyX2InLocus) {
            if (abs(locusBackPoint.x - tmpBodyX1) < abs(locusBackPoint.x - tmpBodyX2)) {
                backBodyX = tmpBodyX1;
            }
            else {
                backBodyX = tmpBodyX2;
            }
        }
        else if (existsTmpBodyX1InLocus) {
            backBodyX = tmpBodyX1;
        }
        else if (existsTmpBodyX2InLocus) {
            backBodyX = tmpBodyX2;
        }
        else {
            return null;
        }

        backBodyY = a * backBodyX + b;
    }

    const distanceFromLocusBackPointToBasePosition = dist(locusBackPoint.x, locusBackPoint.y, basePosition.x, basePosition.y);
    const distanceFromLocusBackPointToBackBodyPosition = dist(locusBackPoint.x, locusBackPoint.y, backBodyX, backBodyY);

    if (distanceFromLocusBackPointToBasePosition < distanceFromLocusBackPointToBackBodyPosition) {
        return null;
    }

    return {x: backBodyX, y: backBodyY};
}
