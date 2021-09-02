
function Feeder($canvas) {
    this.$canvas = $canvas;
    this.feedRadius = 20;
}

Feeder.prototype.sowFeed = function(snake) {
    let x, y, snakeRotationRadius;

    do {
        x = Math.floor(Math.randomInt(GAME_FIELD_WIDTH + 1 - this.feedRadius * 2) + this.feedRadius);
        y = Math.floor(Math.randomInt(GAME_FIELD_HEIGHT + 1 - this.feedRadius * 2) + this.feedRadius);
        snakeRotationRadius = snake.speed / Math.sqrt(2 * (1 - Math.cos(snake.headAngle.centralAngle))) + snake.radius;
    }
    while (
        y < -x + snakeRotationRadius ||
        y <  x - GAME_FIELD_WIDTH  + snakeRotationRadius ||
        y >  x + GAME_FIELD_HEIGHT - snakeRotationRadius ||
        y > -x + GAME_FIELD_WIDTH  + GAME_FIELD_HEIGHT - snakeRotationRadius
    );

    return new Feed(this.$canvas, this, x, y);
};

