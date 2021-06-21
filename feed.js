
function Feed(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
}

Feed.prototype.draw = function() {
    push();
    fill(103, 43, 67);
    ellipse(this.x, this.y, this.radius * 2);
    pop();
};

function FeedManager() {
    this.feedRadius = 20;
}

FeedManager.prototype.firstSowFeed = function() {
    return new Feed(400, 100, this.feedRadius);
};

FeedManager.prototype.sowFeed = function(snake) {
    const x = floor(random(width + 1 - this.feedRadius * 2) + this.feedRadius);
    const y = floor(random(height + 1 - this.feedRadius * 2) + this.feedRadius);
    const snakeRotationRadius = snake.speed / sqrt(2 * (1 - cos(snake.rotationDegree))) + snake.partsRadius;

    if (y < -x + snakeRotationRadius || 
        y < x - width + snakeRotationRadius ||
        y > x + height - snakeRotationRadius ||
        y > -x + width + height - snakeRotationRadius) {
        return this.sowFeed(snake);
    }

    return new Feed(x, y, this.feedRadius);
};


