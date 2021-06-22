
function GmaeOverScene(prevScene) {
    this.prevScene = prevScene;
    this.canPressKey = false;

    noLoop();
    this.draw();
};

GmaeOverScene.prototype = Object.create(Scene.prototype);

GmaeOverScene.prototype.draw = function() {
    background(128);

    this.prevScene.feed.draw();
    this.prevScene.snake.draw();

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(50);
    text("ゲームオーバー", width / 2, height * 2 / 5);

    textSize(30);
    text("スコア：" + this.prevScene.snake.bodyCount, width / 2, height * 3 / 5);

    const self = this;
    setTimeout(function() {
        self.canPressKey = true;
    }, 250);
};

GmaeOverScene.prototype.keyPressed = function() {
    if (this.canPressKey) {
        scene = new GmaeStartScene();
    }
};
