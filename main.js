
const headPotision = {x: 100, y: 100};
const snakePartsRadius = 25;
let bodyCount = 0;
let degree = 0;
let oldDegree = null;
const speed = 4;
const rotationDegree = 2;
const traceQueue = []

const feedPotision = {x: 400, y: 100};
const feedRadius = Math.floor(snakePartsRadius * 0.8);

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

    if (0 < headPotision.x - snakePartsRadius && headPotision.x + snakePartsRadius < width && 0 < headPotision.y - snakePartsRadius && headPotision.y + snakePartsRadius < height) {
        headPotision.x += speed * cos(degree);
        headPotision.y += speed * sin(degree);
    }
    else {
        noLoop();
    }

    if (dist(headPotision.x, headPotision.y, feedPotision.x, feedPotision.y) <= snakePartsRadius + feedRadius) {
        bodyCount++;
        feedPotision.x = floor(random(width + 1 - feedRadius * 2) + feedRadius);
        feedPotision.y = floor(random(height + 1 - feedRadius * 2) + feedRadius);
    }

    // push();
    // stroke(255, 0, 0);
    // strokeWeight(snakePartsRadius);
    // for (let i = 0; i < traceQueue.length; i++) {
    //     point(traceQueue[i].x, traceQueue[i].y);
    // }
    // pop();

    fill(103, 43, 67);
    ellipse(feedPotision.x, feedPotision.y, feedRadius * 2);

    fill(0, 200, 0);
    ellipse(headPotision.x, headPotision.y, snakePartsRadius * 2);

    let basePosition = headPotision;
    let traceQueueIndex = traceQueue.length - 1;

    for (let bodyIndex = 0; bodyIndex < bodyCount; bodyIndex++) {

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
                // if (bodyIndex === bodyCount - 1) { // debug code
                //     if (dist(backBodyPosition.x, backBodyPosition.y, headPotision.x, headPotision.y) < snakePartsRadius * 2 + 0.5) {
                //         throw new Error("bug");
                //     }
                // }
                break;
            }

            traceQueueIndex--;
        }

        if (backBodyPosition != null) {
            fill(100, 200 * (1 - bodyIndex / (bodyCount + 1)), 100);

            ellipse(backBodyPosition.x, backBodyPosition.y, snakePartsRadius * 2);
        }
        else {
            break;
        }

        basePosition = backBodyPosition;
    }

    if (traceQueueIndex > 0) {
        traceQueue.splice(0, traceQueueIndex);
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

    const r = snakePartsRadius * 2;
    const c = basePosition.x;
    const d = basePosition.y;

    if (locusBackPoint.x === locusFrontPoint.x) {
        tmpBodyY1 = d - sqrt(pow(r, 2) - pow(locusFrontPoint.x - c, 2));
        tmpBodyY2 = d + sqrt(pow(r, 2) - pow(locusFrontPoint.x - c, 2));

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
        let tmpBodyX1, tmpBodyX2;
        const a = (locusFrontPoint.y - locusBackPoint.y) / (locusFrontPoint.x - locusBackPoint.x);
        const b = locusFrontPoint.y - a * locusFrontPoint.x;

        if (a === 0) {
            tmpBodyX1 = c - sqrt(pow(r, 2) - pow(locusFrontPoint.y - d, 2));
            tmpBodyX2 = c + sqrt(pow(r, 2) - pow(locusFrontPoint.y - d, 2));
        }
        else {
            const A = pow(a, 2) + 1;
            const B = a * (b - d) - c;
            const C = pow(b - d, 2) + pow(c, 2) - pow(r, 2);

            const D = sqrt(pow(B, 2) - A * C);

            if (Number.isNaN(D)) {
                return null;
            }

            tmpBodyX1 = (-B - D) / A;
            tmpBodyX2 = (-B + D) / A;
        }

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
