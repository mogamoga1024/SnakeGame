
function GamePlayScene() {
    this.canLoop = true;
    this.feedMaxCount = Feed.UNTIL_NOURISH_COUNT;

    this.setupCanvas();

    this.snake = new Snake($("#snake"), $("#snake-left-eye"), $("#snake-right-eye"));
    this.$feedList = $(".feed");
    this.feeder = new Feeder();
    this.feedList = [];

    this.firstKeyCode = null;
    this.secondeKeyCode = null;

    // const feed = this.feeder.sowFeed(this.$feedList.eq(0), this.snake)
    // for (let i = 0; i < 300; i++) {
    //     this.snake.eatFeed(feed);
    // }
};

GamePlayScene.prototype = Object.create(Scene.prototype);
GamePlayScene.prototype.constructor = GamePlayScene;

GamePlayScene.prototype.setupCanvas = function() {
    $svg.empty();

    for (let i = 0; i < this.feedMaxCount; i++) {
        const feed = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        const $feed = $(feed);
        $svg.append(feed);
        $feed.addClass("feed");
    }
    
    const snake = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const $snake = $(snake);
    $svg.append(snake);
    $snake.attr("id", "snake");

    const snakeLeftEye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const $snakeLeftEye = $(snakeLeftEye);
    $svg.append(snakeLeftEye);
    $snakeLeftEye.attr("id", "snake-left-eye");

    const snakeRightEye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const $snakeRightEye = $(snakeRightEye);
    $svg.append(snakeRightEye);
    $snakeRightEye.attr("id", "snake-right-eye");
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
            this.feedList.push(this.feeder.sowFeed(this.$feedList.eq(i), this.snake));
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
