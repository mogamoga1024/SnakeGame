
const KEY_CODE = {
    SPACE: 32,
    V: 86
};

let scene;

function setup() {
    const canvasWidth = windowWidth * 0.9;
    const canvasHeight = windowHeight * 0.9;
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.position((windowWidth - canvasWidth) / 2, (windowHeight - canvasHeight) / 2);

    angleMode(DEGREES);

    SceneManager.start(new GmaeStartScene());
}
