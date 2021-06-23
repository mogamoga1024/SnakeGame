
function Scene() {}

Scene.prototype.start = function() {}
Scene.prototype.draw = function() {}
Scene.prototype.keyPressed = function() {}
Scene.prototype.keyReleased = function() {}

const SceneManager = (function() {
    let currentScene = new Scene();
    draw = function() {
        currentScene.draw();
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

