
function GmaeStartScene() {};

GmaeStartScene.prototype = Object.create(Scene.prototype);
GmaeStartScene.prototype.constructor = GmaeStartScene;

GmaeStartScene.prototype.start = function() {
    $svg.empty();

    $svg.append("<b>a</b>");
};

GmaeStartScene.prototype.update = function() {
    background(128);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(50);
    text("ゲーミングスネークゲーム", width / 2, height * 2 / 5);

    textSize(30);
    text("press any key", width / 2, height * 3 / 5);
};

GmaeStartScene.prototype.keyPressed = function(keyCode) {
    if (keyCode === KEY_CODE.F12) return;

    SceneManager.start(new GamePlayScene());
};

