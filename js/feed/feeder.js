
function FeedManager(feedType) {
    this.feedType = feedType;
}

FeedManager.prototype.sowFeed = function(snake) {
    const feed = FeedFactory.create(this.feedType);
    let x, y, snakeRotationRadius;

    do {
        x = floor(random(width + 1 - feed.radius * 2) + feed.radius);
        y = floor(random(height + 1 - feed.radius * 2) + feed.radius);
        snakeRotationRadius = snake.speed / sqrt(2 * (1 - cos(snake.headAngle.centralAngle))) + snake.partsRadius;
    }
    while (
        y < -x + snakeRotationRadius          || 
        y <  x - width  + snakeRotationRadius ||
        y >  x + height - snakeRotationRadius ||
        y > -x + width  + height - snakeRotationRadius
    );

    feed.position = new Position(x, y);

    return feed;
};

