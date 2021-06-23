
function Scene() {}

Scene.prototype.start = function() {}
Scene.prototype.draw = function() {}
Scene.prototype.keyPressed = function() {}
Scene.prototype.keyReleased = function() {}

const SceneManager = {
    start: function(scene) {
        scene.start();
        draw = function() {
            scene.draw();
        };
        keyPressed = function() {
            scene.keyPressed();
        };
        keyReleased = function() {
            scene.keyReleased();
        }
    }
};
