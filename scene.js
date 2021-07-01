
function Scene() {}

Scene.prototype.start = function() {};
Scene.prototype.update = function() {};
Scene.prototype.keyPressed = function() {};
Scene.prototype.keyReleased = function() {};

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

