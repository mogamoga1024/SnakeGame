
let x = 100;
let y = 100;
const radius = 25;
let degree = 0;
const speed = 3;
const rotationDegree = 2;

function setup() {
    const canvasWidth = windowWidth * 0.9;
    const canvasHeight = windowHeight * 0.9;
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.position((windowWidth - canvasWidth) / 2, (windowHeight - canvasHeight) / 2);

    angleMode(DEGREES);
}

function draw() {
    clear();

    if (keyIsPressed) {
        degreeChangeByKey();
    }

    if (0 < x - radius && x + radius < width && 0 < y - radius && y + radius < height) {
        x += speed * cos(degree);
        y += speed * sin(degree);
    }
    else {
        noLoop();
    }

    ellipse(x, y, radius * 2);
    fill(0, 200, 0);
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


