
function Feeder() {}

Feeder.prototype.sowFeed = function($feed, snake) {
    const feedRadius = 20;
    let x, y, snakeRotationRadius;
    const width = $svg.width();
    const height = $svg.height();

    do {
        x = Math.floor(Math.randomInt(width + 1 - feedRadius * 2) + feedRadius);
        y = Math.floor(Math.randomInt(height + 1 - feedRadius * 2) + feedRadius);
        snakeRotationRadius = snake.speed / Math.sqrt(2 * (1 - Math.cos(snake.headAngle.centralAngle))) + snake.radius;
    }
    while (
        y < -x + snakeRotationRadius          || 
        y <  x - width  + snakeRotationRadius ||
        y >  x + height - snakeRotationRadius ||
        y > -x + width  + height - snakeRotationRadius
    );

    return new Feed($feed, feedRadius, x, y);
};

