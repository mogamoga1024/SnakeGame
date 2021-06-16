
let x = 100;
let y = 100;
const radius = 25;
let degree = 0;
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

    traceQueue.push({x: x, y: y});
}

function draw() {
    clear();

    // push();
    // stroke(0, 200, 0, 70);
    // strokeWeight(radius * 2);
    // line(100, 100, width - 100, height - 100);
    // pop();
    

    if (keyIsPressed) {
        degreeChangeByKey();
        if (oldDegree != degree) {
            oldDegree = degree;
            traceQueue.push({x: x, y: y});
        }
    }

    if (0 < x - radius && x + radius < width && 0 < y - radius && y + radius < height) {
        x += speed * cos(degree);
        y += speed * sin(degree);
    }
    else {
        noLoop();
    }

    push();
    stroke(255, 0, 0);
    strokeWeight(radius);
    for (let i = 0; i < traceQueue.length; i++) {
        point(traceQueue[i].x, traceQueue[i].y);
    }
    pop();

    fill(0, 200, 0);
    ellipse(x, y, radius * 2);
}

function degreeChangeByKey() {
    if (keyCode === UP_ARROW) {
        if (90 < degree && degree < 270) {
            degree = (degree + rotationDegree) % 360;
        }
        else if (270 < degree || degree < 90) {
            degree = (degree - rotationDegree + 360) % 360;
        }
    }
    else if (keyCode === DOWN_ARROW) {
        if (90 < degree && degree < 270) {
            degree = (degree - rotationDegree + 360) % 360;
        }
        else if (270 < degree || degree < 90) {
            degree = (degree + rotationDegree) % 360;
        }
    }
    else if (keyCode === RIGHT_ARROW) {
        if (180 < degree) {
            degree = (degree + rotationDegree) % 360;
        }
        else if (0 < degree && degree < 180) {
            degree = (degree - rotationDegree + 360) % 360;
        }
    }
    else if (keyCode === LEFT_ARROW) {
        if (180 < degree) {
            degree = (degree - rotationDegree + 360) % 360;
        }
        else if (0 < degree && degree < 180) {
            degree = (degree + rotationDegree) % 360;
        }
    }
}


