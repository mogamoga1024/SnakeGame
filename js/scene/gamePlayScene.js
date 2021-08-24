
function GamePlayScene() {
    this.snake = new Snake();
    this.feedManager = new FeedManager();
    this.feedMaxCount = Feed.UNTIL_NOURISH_COUNT;
    this.feedList = [];

    this.firstKeyCode = null;
    this.secondeKeyCode = null;
};

GamePlayScene.prototype = Object.create(Scene.prototype);
GamePlayScene.prototype.constructor = GamePlayScene;

GamePlayScene.prototype.start = function() {
    /*for (let i = 0; i < 300; i++) {
        this.snake.eatFeed(new Feed());
    }*/
};

GamePlayScene.prototype.update = function() {
    if (this.firstKeyCode !== null) {
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
            this.snake.eatFeed(feed);
            this.feedList.splice(i, 1);
        }
    }

    for (let i = 0; i < this.feedList.length; i++) {
        this.feedList[i].draw();
    }
    this.snake.draw();
};

GamePlayScene.prototype.keyPressed = function(keyCode) {
    /*if (keyCode === KEY_CODE.SPACE) {
        if (isLooping()) {
            noLoop();
        }
        else {
            loop();
        }
        return;
    }*/
    
    if (keyCode !== this.firstKeyCode) {
        this.secondeKeyCode = this.firstKeyCode;
    }
    this.firstKeyCode = keyCode;
};

GamePlayScene.prototype.keyReleased = function(keyCode) {
    if (keyCode === KEY_CODE.SPACE) return;

    if (keyCode === this.firstKeyCode) {
        this.firstKeyCode = this.secondeKeyCode;
        this.secondeKeyCode = null;
    }
    else if (keyCode === this.secondeKeyCode) {
        this.secondeKeyCode = null;
    }
};
