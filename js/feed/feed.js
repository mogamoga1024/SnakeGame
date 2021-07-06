
function Feed(x, y, radius) {
    this.position = new Position(x, y);
    this.radius = radius;
}

Feed.prototype.draw = function() {
    push();
    fill(103, 43, 67);
    ellipse(this.position.x, this.position.y, this.radius * 2);
    pop();
};

Feed.prototype.nourish = function(snake) {
    snake.bodyCount++;
    snake.speed += 0.3;
};
