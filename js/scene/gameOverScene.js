
function GmaeOverScene(prevScene) {
    this.prevScene = prevScene;
    this.canPressKey = false;
};

GmaeOverScene.prototype = Object.create(Scene.prototype);
GmaeOverScene.prototype.constructor = GmaeOverScene;

GmaeOverScene.prototype.start = function() {
    const width = $svg.width();
    const height = $svg.height();

    const text1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    const $text1 = $(text1);
    $svg.append(text1);
    $text1.attr({
        "text-anchor": "middle",
        "x": width / 2,
        "y": height * 2 / 5,
        "font-size": 50
    });
    $text1.text("ゲームオーバー");

    const text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    const $text2 = $(text2);
    $svg.append(text2);
    $text2.attr({
        "text-anchor": "middle",
        "x": width / 2,
        "y": height * 3 / 5,
        "font-size": 30
    });
    $text2.text("スコア：" + this.prevScene.snake.bodyCount);

    const self = this;
    setTimeout(function() {
        self.canPressKey = true;
    }, 500);
};

GmaeOverScene.prototype.keyReleased = function(keyCode) {
    if (keyCode === KEY_CODE.F12) return;

    if (this.canPressKey) {
        SceneManager.start(new GmaeStartScene());
    }
};
