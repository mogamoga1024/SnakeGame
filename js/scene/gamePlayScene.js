
function GamePlayScene(gameMode) {
    this.snake = SnakeFactory.create(gameMode.snakeType);
    this.feedManager = new FeedManager(gameMode.feedType);
    this.feed = this.feedManager.firstSowFeed();

    this.firstKeyCode = null;
    this.secondeKeyCode = null;
};

GamePlayScene.prototype = Object.create(Scene.prototype);
GamePlayScene.prototype.constructor = GamePlayScene;

GamePlayScene.prototype.start = function() {
    loop();
};

GamePlayScene.prototype.update = function() {
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
    if (keyCode === KEY_CODE.SPACE) {
        if (isLooping()) {
            noLoop();
        }
        else {
            loop();
        }
        return;
    }
    
    if (this.firstKeyCode !== null) {
        this.secondeKeyCode = this.firstKeyCode;
    }
    this.firstKeyCode = keyCode;
};

GamePlayScene.prototype.keyReleased = function() {
    if (keyCode === KEY_CODE.SPACE) return;

    if (keyCode === this.firstKeyCode) {
        this.firstKeyCode = this.secondeKeyCode;
        this.secondeKeyCode = null;
    }
    else if (keyCode === this.secondeKeyCode) {
        this.secondeKeyCode = null;
    }
};
