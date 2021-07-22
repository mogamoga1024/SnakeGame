
function GmaeOverScene(prevScene) {
    this.prevScene = prevScene;
    this.canPressKey = false;
};

GmaeOverScene.prototype = Object.create(Scene.prototype);
GmaeOverScene.prototype.constructor = GmaeOverScene;

GmaeOverScene.prototype.start = function() {
    noLoop();
    this.update();
};

GmaeOverScene.prototype.update = function() {
    background(128);

    const feedList = this.prevScene.feedList;
    for (let i = 0; i < feedList.length; i++) {
        feedList[i].draw();
    }
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
    if (keyCode === KEY_CODE.F12) return;

    if (this.canPressKey) {
        SceneManager.start(new GmaeStartScene());
    }
};
