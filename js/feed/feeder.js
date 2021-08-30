
function Feeder() {
    this.feedRadius = 20;
}

Feeder.prototype.sowFeed = function(snake) {
    let x, y, snakeRotationRadius;
    const width = $svg.width();
    const height = $svg.height();

    do {
        x = Math.floor(Math.randomInt(width + 1 - this.feedRadius * 2) + this.feedRadius);
        y = Math.floor(Math.randomInt(height + 1 - this.feedRadius * 2) + this.feedRadius);
        snakeRotationRadius = snake.speed / Math.sqrt(2 * (1 - Math.cos(snake.headAngle.centralAngle))) + snake.radius;
    }
    while (
        y < -x + snakeRotationRadius          || 
        y <  x - width  + snakeRotationRadius ||
        y >  x + height - snakeRotationRadius ||
        y > -x + width  + height - snakeRotationRadius
    );

    return new Feed(this, x, y);
};

