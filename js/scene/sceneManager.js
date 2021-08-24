
const SceneManager = (function() {
    let timer = null;
    let currentScene = new Scene();

    $window.keydown(
		function(e) {
			currentScene.keyPressed(e.keyCode);
		}
	);
	
	$window.keyup(
		function(e) {
			currentScene.keyReleased(e.keyCode);
		}
	);

    return {
        start: function(scene, _shouldUpdate) {
            const shouldUpdate = (_shouldUpdate === undefined) ? true : _shouldUpdate;
            currentScene = scene;
            clearInterval(timer);
            currentScene.start();
            if (shouldUpdate) {
                timer = setInterval(function() {
                    currentScene.update();
                }, 1000 / 60);
            }
        }
    };
})();



