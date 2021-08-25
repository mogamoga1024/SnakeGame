
function GameConfig(snakeType, feedType) {
    this.snakeType = snakeType;
    this.feedType = feedType;
}

GameConfig.findByKeyCode = function(keyCode) {
    let snakeType = SnakeFactory.NORMAL;
    let feedType = FeedFactory.NORMAL;

    switch (keyCode) {
        case KEY_CODE.D:
            snakeType = SnakeFactory.DEBUG;
            break;
        case KEY_CODE.S:
            snakeType = SnakeFactory.SMOOTH;
            feedType = FeedFactory.NO_STROKE;
            break;
        case KEY_CODE.V:
            snakeType = SnakeFactory.YOKOMUKUNDAYO90DO;
            break;
        default:
    }

    return new GameConfig(snakeType, feedType);
};

