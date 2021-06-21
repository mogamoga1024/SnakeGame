const snake = new Snake();
const feedManager = new FeedManager();
let feed = feedManager.firstSowFeed();

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
}

function draw() {
    background(128, 128, 128);

    if (keyIsPressed) {
        snake.degreeChangeByKey();
    }

    if (snake.isHittingWall()) {
        noLoop();
    }
    
    snake.move();

    if (snake.isHittingBody()) {
        noLoop();
    }

    if (snake.canEatFeed(feed)) {
        snake.eatFeed();
        feed = feedManager.sowFeed(snake);
    }

    // push();
    // stroke(255, 0, 0);
    // strokeWeight(partsRadius);
    // for (let i = 0; i < traceQueue.length; i++) {
    //     point(traceQueue[i].x, traceQueue[i].y);
    // }
    // pop();

    feed.draw();
    snake.draw();
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

function plusRotate(degree1, degree2) {
    return (degree1 + degree2) % 360;
}
function minusRotate(degree1, degree2) {
    return (degree1 - degree2 + 360) % 360;
}

