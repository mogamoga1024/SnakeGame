
canvasToCenter();

$window.resize(function() {
    canvasToCenter()  
});

SceneManager.start(new GmaeStartScene(), false);
