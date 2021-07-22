
function Feed(x, y, radius) {
    this.position = new Position(x, y);
    this.radius = radius;
    this.drawer = FeedDrawer;
}

Feed.UNTIL_NOURISH_COUNT = 10;

Feed.prototype.draw = function() {
    this.drawer.draw(this);
};

Feed.prototype.nourish = function(snake) {
    snake.bodyCount++;

    if (snake.bodyCount % Feed.UNTIL_NOURISH_COUNT === 0) {
        if (snake.speed < 10) {
            snake.speed += 2;
            if (snake.headAngle.N > 12) {
                snake.headAngle.convertRegular4nPolygon(snake.headAngle.N - 12);
            }
        }
        if (snake.partsRadius > 15) {
            snake.partsRadius *= 0.95;
            this.radius *= 0.95;
        }
    }
};
