
function Scene() {}

Scene.prototype.draw = function() {}
Scene.prototype.keyPressed = function() {}
Scene.prototype.keyReleased = function() {}

Scene.prototype.start = function() {
    scene = this;
};

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
