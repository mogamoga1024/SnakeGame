
function GmaeOverScene(prevScene) {
    this.prevScene = prevScene;

    noLoop();
    this.draw();
};

GmaeOverScene.prototype = Object.create(Scene.prototype);
GmaeOverScene.prototype.constructor = Scene;

GmaeOverScene.prototype.draw = function() {
    background(128);

    this.prevScene.feed.draw();
    this.prevScene.snake.draw();

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(50);
    text("ゲームオーバー", width / 2, height * 2 / 5);
};

GmaeOverScene.prototype.keyPressed = function() {
    scene = new GmaeStartScene();
};
