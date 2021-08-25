
function GmaeStartScene() {};

GmaeStartScene.prototype = Object.create(Scene.prototype);
GmaeStartScene.prototype.constructor = GmaeStartScene;

GmaeStartScene.prototype.start = function() {
    $svg.empty();

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
    $text1.text("SVG de スネークゲーム");

    const text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    const $text2 = $(text2);
    $svg.append(text2);
    $text2.attr({
        "text-anchor": "middle",
        "x": width / 2,
        "y": height * 3 / 5,
        "font-size": 30
    });
    $text2.text("press any key");
};

GmaeStartScene.prototype.keyReleased = function(keyCode) {
    if (keyCode === KEY_CODE.F12) return;

    SceneManager.start(new GamePlayScene());
};

