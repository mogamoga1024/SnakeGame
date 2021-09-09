
function GameOverScene(score) {
    this.score = score;
    this.canPressKey = false;
};

GameOverScene.prototype = Object.create(Scene.prototype);
GameOverScene.prototype.constructor = GameOverScene;

GameOverScene.prototype.start = function($canvas) {
    const text1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    const $text1 = $(text1);
    $canvas.append(text1);
    $text1.attr({
        "text-anchor": "middle",
        "x": GAME_FIELD_WIDTH / 2,
        "y": GAME_FIELD_HEIGHT * 2 / 5,
        "font-size": 50
    });
    $text1.text("ゲームオーバー");

    const text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    const $text2 = $(text2);
    $canvas.append(text2);
    $text2.attr({
        "text-anchor": "middle",
        "x": GAME_FIELD_WIDTH / 2,
        "y": GAME_FIELD_HEIGHT * 3 / 5,
        "font-size": 30
    });
    $text2.text("スコア：" + this.score);

    const self = this;
    setTimeout(function() {
        self.canPressKey = true;
    }, 500);
};

GameOverScene.prototype.keyup = function(keyCode) {
    if (keyCode === KEY_CODE.F5) return;
    if (keyCode === KEY_CODE.F12) return;

    if (this.canPressKey) {
        SceneManager.start(new GameStartScene());
    }
};
