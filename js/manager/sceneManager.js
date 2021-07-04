
const SceneManager = (function() {
    let currentScene = new Scene();
    draw = function() {
        currentScene.update();
    };
    keyPressed = function() {
        currentScene.keyPressed();
    };
    keyReleased = function() {
        currentScene.keyReleased();
    };
    return {
        start: function(scene) {
            scene.start();
            currentScene = scene;
        }
    }
})();
