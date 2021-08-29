
function GamePlayScene() {
    this.setupCanvas();

    this.snake = new Snake($("#snake"));
    this.feedManager = new FeedManager($(".feed"));
    //this.feedMaxCount = Feed.UNTIL_NOURISH_COUNT;
    this.feedMaxCount = 1;
    this.feedList = [];

    this.firstKeyCode = null;
    this.secondeKeyCode = null;
};

GamePlayScene.prototype = Object.create(Scene.prototype);
GamePlayScene.prototype.constructor = GamePlayScene;

GamePlayScene.prototype.setupCanvas = function() {
    $svg.empty();

    const feed = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const $feed = $(feed);
    $svg.append(feed);
    $feed.addClass("feed");
    
    const snake = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const $snake = $(snake);
    $svg.append(snake);
    $snake.attr("id", "snake");
}

GamePlayScene.prototype.start = function() {
    /*for (let i = 0; i < 300; i++) {
        this.snake.eatFeed(new Feed());
    }*/
};

GamePlayScene.prototype.update = function() {
    if (this.firstKeyCode !== null) {
        this.snake.headDegreeChangeByKeyCode(this.firstKeyCode);
    }
    
    if (this.snake.isHittingWall() || this.snake.isHittingBody()) {
        SceneManager.start(new GmaeOverScene(this), false);
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

    this.snake.move();

    // for (let i = 0; i < this.feedList.length; i++) {
    //     this.feedList[i].draw();
    // }
    this.snake.draw();
};

GamePlayScene.prototype.keydown = function(keyCode) {
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
