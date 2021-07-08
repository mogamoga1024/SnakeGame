
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
    snake.speed += 0.3;
};
