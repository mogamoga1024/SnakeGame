
const SPACE = 32;
let scene = new GmaeStartScene();

function setup() {
    const canvasWidth = windowWidth * 0.9;
    const canvasHeight = windowHeight * 0.9;
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.position((windowWidth - canvasWidth) / 2, (windowHeight - canvasHeight) / 2);

    angleMode(DEGREES);
}

function draw() {
    scene.draw();
}

function keyPressed() {
    scene.keyPressed();
}

function keyReleased() {
    scene.keyReleased();
}
