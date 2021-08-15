
function GamePlayScene(gameMode) {
    this.snake = SnakeFactory.create(gameMode.snakeType);
    this.feedManager = new FeedManager(gameMode.feedType);
    this.feedMaxCount = Feed.UNTIL_NOURISH_COUNT;
    this.feedList = [];

    this.firstKeyCode = null;
    this.secondeKeyCode = null;
};

GamePlayScene.prototype = Object.create(Scene.prototype);
GamePlayScene.prototype.constructor = GamePlayScene;

GamePlayScene.prototype.start = function() {
    loop();
    /*for (let i = 0; i < 300; i++) {
        this.snake.eatFeed(new Feed());
    }*/
};

GamePlayScene.prototype.update = function() {
    background(128);

    if (keyIsPressed) {
        this.snake.headDegreeChangeByKeyCode(this);
    }
    
    this.snake.move();

    if (this.snake.isHittingWall() || this.snake.isHittingBody()) {
        SceneManager.start(new GmaeOverScene(this));
        return;
    }

    if (this.feedList.length === 0) {
        for (let i = 0; i < this.feedMaxCount; i++) {
            this.feedList.push(this.feedManager.sowFeed(this.snake));
        }
    }

    for (let i = this.feedList.length - 1; i >= 0; i--) {
        const feed = this.feedList[i];
        if (this.snake.canEatFeed(feed)) {
            //this.snake.eatFeed(feed);
            this.feedList.splice(i, 1);
        }
    }

    for (let i = 0; i < this.feedList.length; i++) {
        //this.feedList[i].draw();
    }
    this.snake.draw();

    const fps = frameRate();
    fill(255);
    stroke(0);
    text("FPS: " + fps.toFixed(2), 10, height - 10);
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
