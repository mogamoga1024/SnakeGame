
function GamePlayScene(isVerticalMode) {
    this.snake = new Snake();
    this.feedManager = new FeedManager();
    this.feed = this.feedManager.firstSowFeed();

    this.latestKeyCode = null;
    this.isPressingUpArrow = false;
    this.isPressingDownArrow = false;
    this.isPressingLeftArrow = false;
    this.isPressingRightArrow = false;

    if (isVerticalMode) {
        this.snake.rotationDegree = 90;
    }

    loop();
};

GamePlayScene.prototype = Object.create(Scene.prototype);
GamePlayScene.prototype.constructor = GamePlayScene;

GamePlayScene.prototype.draw = function() {
    background(128);

    if (keyIsPressed) {
        this.snake.headDegreeChangeByKey(this);
    }
    
    this.snake.move();

    if (this.snake.isHittingWall() || this.snake.isHittingBody()) {
        SceneManager.start(new GmaeOverScene(this));
        return;
    }

    if (this.snake.canEatFeed(this.feed)) {
        this.snake.eatFeed();
        this.feed = this.feedManager.sowFeed(this.snake);
    }

    this.feed.draw();
    this.snake.draw();
};

GamePlayScene.prototype.keyPressed = function() {
    switch (keyCode) {
        case KEY_CODE.SPACE:
            if (isLooping()) {
                noLoop();
            }
            else {
                loop();
            }
            break;
        case UP_ARROW   : this.isPressingUpArrow    = true; this.latestKeyCode = keyCode; break;
        case DOWN_ARROW : this.isPressingDownArrow  = true; this.latestKeyCode = keyCode; break;
        case LEFT_ARROW : this.isPressingLeftArrow  = true; this.latestKeyCode = keyCode; break;
        case RIGHT_ARROW: this.isPressingRightArrow = true; this.latestKeyCode = keyCode; break;
    }
};

GamePlayScene.prototype.keyReleased = function() {
    switch (keyCode) {
        case UP_ARROW   : this.isPressingUpArrow    = false; this.latestKeyCode = null; break;
        case DOWN_ARROW : this.isPressingDownArrow  = false; this.latestKeyCode = null; break;
        case LEFT_ARROW : this.isPressingLeftArrow  = false; this.latestKeyCode = null; break;
        case RIGHT_ARROW: this.isPressingRightArrow = false; this.latestKeyCode = null; break;
    }
};
