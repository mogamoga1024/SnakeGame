
function Feed($canvas, feeder, x, y) {
    this.position = new Position(x, y);
    this.feeder = feeder;
    this.radius = this.feeder.feedRadius;

    const feed = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    $canvas.append(feed);

    this.$feed = $(feed);
    this.$feed.attr({
        "cx": this.position.x,
        "cy": this.position.y,
        "r": this.radius,
        "fill": "brown"
    });
}

Feed.UNTIL_NOURISH_COUNT = 10;

Feed.prototype.eaten = function(snake) {
    this.$feed.remove();

    snake.eatCount++;

    if (snake.eatCount % Feed.UNTIL_NOURISH_COUNT === 0) {
        if (snake.speed < 10) {
            snake.speed += 0.5;
            const n = snake.headAngle.N / 4 - 2;
            if (n > 0) {
                snake.headAngle.convertRegular4nPolygon(n);
            }
        }
        if (snake.radius > 15) {
            snake.scale *= 0.99;
            this.feeder.feedRadius *= 0.99;
        }
    }

    if (snake.trace.length > 0) {
        snake.trace[snake.trace.length - 1].x = snake.tailPosition.x;
        snake.trace[snake.trace.length - 1].y = snake.tailPosition.y;
    }
};
