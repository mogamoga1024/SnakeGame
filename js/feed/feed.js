
function Feed(x, y, radius) {
    this.position = new Position(x, y);
    this.radius = radius;
    this.drawer = FeedDrawer;
}

Feed.prototype.draw = function() {
    this.drawer.draw(this);
};

Feed.prototype.nourish = function(snake) {
    snake.bodyCount++;
    if (snake.speed < 10) {
        snake.speed += 0.25;
        if (snake.bodyCount % 3 === 0 && snake.headAngle.N > 4) {
            snake.headAngle.convertRegular4nPolygon(snake.headAngle.N - 4);
        }
    }
    if (snake.partsRadius > 15) {
        snake.partsRadius *= 0.995;
        this.radius *= 0.995;
    }
};
