
function GmaeStartScene() {
    noLoop();
    this.draw();
};

GmaeStartScene.prototype = Object.create(Scene.prototype);
GmaeStartScene.prototype.constructor = Scene;

GmaeStartScene.prototype.draw = function() {
    background(128);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(50);
    text("ゲーミングスネークゲーム", width / 2, height * 2 / 5);

    textSize(30);
    text("press any key", width / 2, height * 3 / 5);
};

GmaeStartScene.prototype.keyPressed = function() {
    scene = new GamePlayScene();
};

