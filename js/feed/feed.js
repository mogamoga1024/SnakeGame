
function Feed($feed, radius, x, y) {
    this.position = new Position(x, y);
    this.radius = radius;

    this.$feed = $feed;
    this.$feed.attr({
        "cx": this.position.x,
        "cy": this.position.y,
        "r": this.radius,
        "fill": "brown",
        "opacity": 1
    });
}

Feed.UNTIL_NOURISH_COUNT = 10;

Feed.prototype.eaten = function(snake) {
    this.$feed.attr("opacity", 0);

    snake.bodyCount++;

    if (snake.bodyCount % Feed.UNTIL_NOURISH_COUNT === 0) {
        if (snake.speed < 10) {
            snake.speed += 1;
            const n = snake.headAngle.N / 4;
            if (n > 3) {
                snake.headAngle.convertRegular4nPolygon(n - 3);
            }
        }
        if (snake.radius > 15) {
            snake.radius *= 0.95;
            this.radius *= 0.95;

            snake.$snake.attr("stroke-width", snake.radius * 2);
            this.$feed.attr("r", this.radius);
        }
    }

    if (snake.trace.length > 0) {
        snake.trace[snake.trace.length - 1].x = snake.tailPosition.x;
        snake.trace[snake.trace.length - 1].y = snake.tailPosition.y;
    }
};
