
function GamePlayScene() {
    this.setupCanvas();

    this.snake = new Snake($("#snakeCanvas"));
    this.feeder = new Feeder($("#feedCanvas"));
    this.feedList = [];

    this.canLoop = true;
    this.feedMaxCount = Feed.UNTIL_NOURISH_COUNT;
    this.firstKeyCode = null;
    this.secondeKeyCode = null;

    // const feed = this.feeder.sowFeed(this.snake)
    // for (let i = 0; i < 300; i++) {
    //     this.snake.eatFeed(feed);
    // }
};

GamePlayScene.prototype = Object.create(Scene.prototype);
GamePlayScene.prototype.constructor = GamePlayScene;

GamePlayScene.prototype.setupCanvas = function() {
    $svg.empty();

    const feedCanvas = document.createElementNS("http://www.w3.org/2000/svg", "g");
    $svg.append(feedCanvas);
    $(feedCanvas).attr("id", "feedCanvas");

    const snakeCanvas = document.createElementNS("http://www.w3.org/2000/svg", "g");
    $svg.append(snakeCanvas);
    $(snakeCanvas).attr("id", "snakeCanvas");
}

GamePlayScene.prototype.update = function() {
    if (this.canLoop === false) return;

    if (this.firstKeyCode !== null) {
        this.snake.headDegreeChangeByKeyCode(this.firstKeyCode);
    }
    
    if (this.snake.isHittingWall() || this.snake.isHittingBody()) {
        SceneManager.start(new GmaeOverScene(this.snake.eatCount), false);
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
        if (this.canLoop) {
            this.canLoop = false;
        }
        else {
            this.canLoop = true;
        }
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
