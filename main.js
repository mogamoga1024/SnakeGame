
const headPotision = {x: 100, y: 100};
const snakePartsRadius = 25;
let bodyCount = 0;
let bodyPotisionArray = [];
let degree = 0;
let oldDegree = null;
let speed = 4;
const rotationDegree = 3;
const traceQueue = []

let feedPotision = {x: 400, y: 100};
const feedRadius = Math.floor(snakePartsRadius * 0.8);

const SPACE = 32;

let latestKeyCode = null;
let isPressingUpArrow = false;
let isPressingDownArrow = false;
let isPressingLeftArrow = false;
let isPressingRightArrow = false;

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

    // fill(103, 43, 67);
    // for (let i = 0; i < 1000; i++) {
    //     feedPotision.x = floor(random(width + 1 - feedRadius * 2) + feedRadius);
    //     feedPotision.y = floor(random(height + 1 - feedRadius * 2) + feedRadius);

    //     const snakeRotationRadius = speed / sqrt(2 * (1 - cos(rotationDegree))) + snakePartsRadius;

    //     if (feedPotision.y < -feedPotision.x + snakeRotationRadius) continue;
    //     if (feedPotision.y < feedPotision.x - width + snakeRotationRadius) continue;
    //     if (feedPotision.y > feedPotision.x + height - snakeRotationRadius) continue;
    //     if (feedPotision.y > -feedPotision.x + width + height - snakeRotationRadius) continue;

    //     ellipse(feedPotision.x, feedPotision.y, feedRadius * 2);
    // }

    // return;

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

    let basePosition = headPotision;
    let traceQueueIndex = traceQueue.length - 1;
    bodyPotisionArray = [];

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
                break;
            }

            traceQueueIndex--;
        }

        if (backBodyPosition != null) {
            bodyPotisionArray.push({x: backBodyPosition.x, y: backBodyPosition.y});
        }
        else {
            break;
        }

        basePosition = backBodyPosition;
    }

    for (let i = 1; i < bodyPotisionArray.length; i++) {
        const bodyPotision = bodyPotisionArray[i];
        if (dist(headPotision.x, headPotision.y, bodyPotision.x, bodyPotision.y) <= snakePartsRadius * 2) {
            noLoop();
            break;
        }
    }

    if (dist(headPotision.x, headPotision.y, feedPotision.x, feedPotision.y) <= snakePartsRadius + feedRadius) {
        bodyCount++;
        speed += 0.2;
        feedPotision = getNewFeedPosition();
    }

    // push();
    // stroke(255, 0, 0);
    // strokeWeight(snakePartsRadius);
    // for (let i = 0; i < traceQueue.length; i++) {
    //     point(traceQueue[i].x, traceQueue[i].y);
    // }
    // pop();

    if (traceQueueIndex > 0) {
        traceQueue.splice(0, traceQueueIndex);
    }

    fill(103, 43, 67);
    ellipse(feedPotision.x, feedPotision.y, feedRadius * 2);

    push();
    colorMode(HSB, 360, 100, 100);

    //fill(0, 200, 0);
    fill(360, 100, 100);
    ellipse(headPotision.x, headPotision.y, snakePartsRadius * 2);

    for (let i = 0; i < bodyPotisionArray.length; i++) {
        //fill(100, 200 * (1 - i / (bodyPotisionArray.length + 1)), 100);
        fill(360 * (1 - (i + 1) / (bodyPotisionArray.length + 1)), 100, 100);
        ellipse(bodyPotisionArray[i].x, bodyPotisionArray[i].y, snakePartsRadius * 2);
    }
    pop();    
}

function keyPressed() {
    switch (keyCode) {
        case SPACE:
            if (isLooping()) {
                noLoop();
            }
            else {
                loop();
            }
            break;
        case UP_ARROW   : isPressingUpArrow    = true; latestKeyCode = keyCode; break;
        case DOWN_ARROW : isPressingDownArrow  = true; latestKeyCode = keyCode; break;
        case LEFT_ARROW : isPressingLeftArrow  = true; latestKeyCode = keyCode; break;
        case RIGHT_ARROW: isPressingRightArrow = true; latestKeyCode = keyCode; break;
    }
}

function keyReleased() {
    switch (keyCode) {
        case UP_ARROW   : isPressingUpArrow    = false; latestKeyCode = null; break;
        case DOWN_ARROW : isPressingDownArrow  = false; latestKeyCode = null; break;
        case LEFT_ARROW : isPressingLeftArrow  = false; latestKeyCode = null; break;
        case RIGHT_ARROW: isPressingRightArrow = false; latestKeyCode = null; break;
    }
}

function degreeChangeByKey() {
    let shouldPlusRotate = false;
    let shouldMinusRotate = false;

    if (latestKeyCode === UP_ARROW || latestKeyCode === null && isPressingUpArrow) {
        shouldPlusRotate = existInAngularRange(degree, 90, 270);
        shouldMinusRotate = existInAngularRange(degree, 270, 90);
    }
    else if (latestKeyCode === DOWN_ARROW || latestKeyCode === null && isPressingDownArrow) {
        shouldPlusRotate = existInAngularRange(degree, 270, 90);
        shouldMinusRotate = existInAngularRange(degree, 90, 270);
    }
    else if (latestKeyCode === LEFT_ARROW || latestKeyCode === null && isPressingLeftArrow) {
        shouldPlusRotate = existInAngularRange(degree, 0, 180);
        shouldMinusRotate = existInAngularRange(degree, 180);
    }
    else if (latestKeyCode === RIGHT_ARROW || latestKeyCode === null && isPressingRightArrow) {
        shouldPlusRotate = existInAngularRange(degree, 180);
        shouldMinusRotate = existInAngularRange(degree, 0, 180);
    }
    else {
        return;
    }

    if (shouldPlusRotate) {
        degree = plusRotate(degree);
    }
    else if (shouldMinusRotate) {
        degree = minusRotate(degree);
    }
}

/**
 * startDegree, endDegreまでの角度の範囲にtargetDegreeが含まれているか
 * ただし、startDegree, endDegreは含まない。
 */
function existInAngularRange(targetDegree, startDegree, endDegree) {
    if (endDegree === undefined) endDegree = 360;

    if (startDegree < endDegree) {
        return startDegree < targetDegree && targetDegree < endDegree;
    }
    else {
        return startDegree < targetDegree || targetDegree < endDegree;
    }
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

            if (isNaN(D)) {
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

        const existsTmpBodyX1InLocus = minX <= tmpBodyX1 && tmpBodyX1 <= maxX;
        const existsTmpBodyX2InLocus = minX <= tmpBodyX2 && tmpBodyX2 <= maxX;

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

function getNewFeedPosition() {
    const x = floor(random(width + 1 - feedRadius * 2) + feedRadius);
    const y = floor(random(height + 1 - feedRadius * 2) + feedRadius);
    const snakeRotationRadius = speed / sqrt(2 * (1 - cos(rotationDegree))) + snakePartsRadius;

    if (y < -x + snakeRotationRadius || 
        y < x - width + snakeRotationRadius ||
        y > x + height - snakeRotationRadius ||
        y > -x + width + height - snakeRotationRadius) {
        return getNewFeedPosition()
    }

    return {x: x, y: y};
}

