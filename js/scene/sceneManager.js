/*
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
*/

const SceneManager = (function() {
    let timer = null;

    return {
        start: function(scene, _shouldUpdate) {
            const shouldUpdate = (_shouldUpdate === undefined) ? true : _shouldUpdate;
            clearInterval(timer);
            scene.start();
            if (shouldUpdate) {
                timer = setInterval(function() {
                    console.log("hello, world!");
                    scene.update();
                }, 1000 / 60);
            }
        }
    };
})();



