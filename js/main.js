
let feedCanvas, snakeCanvas;
let canvasWidth, canvasHeight;

function setup() {
    const canvasWidth = windowWidth * 0.9;
    const canvasHeight = windowHeight * 0.9;
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.position((windowWidth - canvasWidth) / 2, (windowHeight - canvasHeight) / 2);
    
    feedCanvas = createGraphics(canvasWidth, canvasHeight);
    snakeCanvas = createGraphics(canvasWidth, canvasHeight);

    SceneManager.start(new GmaeStartScene());

    frameRate(60);
}
