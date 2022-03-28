
const SceneManager = (function() {
    const $window = $(window);
    const $svg = $("svg");
    let timer = null;
    let currentScene = new Scene();

    window.GAME_FIELD_WIDTH = $svg.width();
    window.GAME_FIELD_HEIGHT = $svg.height();

    $window.keydown(function(e) {
        return currentScene.keydown(e.keyCode);
    });
	
    $window.keyup(function(e) {
        return currentScene.keyup(e.keyCode);
    });

    function canvasToCenter() {
        $svg.css("top", ($window.height() - GAME_FIELD_HEIGHT) / 2);
        $svg.css("left", ($window.width() - GAME_FIELD_WIDTH) / 2);
    };
    
    canvasToCenter();

    $window.resize(function() {
        canvasToCenter()  
    });

    return {
        start: function(scene, _shouldUpdate) {
            const shouldUpdate = (_shouldUpdate === undefined) ? true : _shouldUpdate;
            currentScene = scene;
            currentScene.start($svg);
            clearInterval(timer);
            if (shouldUpdate) {
                timer = setInterval(function() {
                    currentScene.update($svg);
                }, 1000 / 60);
            }
        }
    };
})();



