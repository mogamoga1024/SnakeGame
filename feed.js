
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
