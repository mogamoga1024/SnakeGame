
let headX = 100;
let headY = 100;
const radius = 25;
let degree = 30;
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

    // todo 浮動小数点の誤差も考慮すべき ← いらんと思う。
    if (preHeadX === headX) {
        throw new Error("体の縦移動未実装");
    }

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

    let bodyX;
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
    const bodyY = a * bodyX + b;

    ellipse(bodyX, bodyY, radius * 2);
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


