
function GamePlayScene() {
    this.snake = null;
    this.feeder = null;
    this.feedList = [];

    this.canLoop = true;
    this.feedMaxCount = Feed.UNTIL_NOURISH_COUNT;
    this.firstKeyCode = null;
    this.secondeKeyCode = null;
};

GamePlayScene.prototype = Object.create(Scene.prototype);
GamePlayScene.prototype.constructor = GamePlayScene;

GamePlayScene.prototype.start = function($canvas) {
    $canvas.empty();

    const feedCanvas = document.createElementNS("http://www.w3.org/2000/svg", "g");
    $canvas.append(feedCanvas);
    this.feeder = new Feeder($(feedCanvas));

    const snakeCanvas = document.createElementNS("http://www.w3.org/2000/svg", "g");
    $canvas.append(snakeCanvas);
    this.snake = new Snake($(snakeCanvas));
}

GamePlayScene.prototype.update = function() {
    if (this.canLoop === false) return;

    if (this.firstKeyCode !== null) {
        this.snake.headAngleChangeByKeyCode(this.firstKeyCode);
    }
    
    if (this.snake.isHittingWall()) {
        SceneManager.start(new GameOverScene(this.snake.eatCount), false);
        return;
    }

    if (this.feedList.length === 0) {
        for (let i = 0; i < this.feedMaxCount; i++) {
            this.feedList.push(this.feeder.sowFeed(this.snake));
        }
    }

    for (let i = this.feedList.length - 1; i >= 0; i--) {
        const feed = this.feedList[i];
        if (this.snake.canEatFeed(feed)) {
            this.snake.eatFeed(feed);
            this.feedList.splice(i, 1);
        }
    }

    this.snake.move();
};

GamePlayScene.prototype.keydown = function(keyCode) {
    if (keyCode === KEY_CODE.SPACE) {
        this.canLoop = !this.canLoop;
        return;
    }
    
    if (keyCode !== this.firstKeyCode) {
        this.secondeKeyCode = this.firstKeyCode;
    }
    this.firstKeyCode = keyCode;
};

GamePlayScene.prototype.keyup = function(keyCode) {
    if (keyCode === KEY_CODE.SPACE) return;

    if (keyCode === this.firstKeyCode) {
        this.firstKeyCode = this.secondeKeyCode;
        this.secondeKeyCode = null;
    }
    else if (keyCode === this.secondeKeyCode) {
        this.secondeKeyCode = null;
    }
};
