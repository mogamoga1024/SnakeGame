
function GmaeStartScene() {};

GmaeStartScene.prototype = Object.create(Scene.prototype);
GmaeStartScene.prototype.constructor = GmaeStartScene;

GmaeStartScene.prototype.start = function($canvas) {
    $canvas.empty();

    const text1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    const $text1 = $(text1);
    $canvas.append(text1);
    $text1.attr({
        "text-anchor": "middle",
        "x": GAME_FIELD_WIDTH / 2,
        "y": GAME_FIELD_HEIGHT * 2 / 5,
        "font-size": 50
    });
    $text1.text("SVG de スネークゲーム");

    const text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    const $text2 = $(text2);
    $canvas.append(text2);
    $text2.attr({
        "text-anchor": "middle",
        "x": GAME_FIELD_WIDTH / 2,
        "y": GAME_FIELD_HEIGHT * 3 / 5,
        "font-size": 30
    });
    $text2.text("press any key");
};

GmaeStartScene.prototype.keyup = function(keyCode) {
    if (keyCode === KEY_CODE.F12) return;

    SceneManager.start(new GamePlayScene());
};

