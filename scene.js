
function Scene() {}

Scene.prototype.draw = function() {}
Scene.prototype.keyPressed = function() {}
Scene.prototype.keyReleased = function() {}

const SceneManager = {
    start: function(scene) {
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
