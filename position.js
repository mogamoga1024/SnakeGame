
function Position(x, y) {
    this.x = x;
    this.y = y;
}

Position.prototype.clone = function() {
    return new Position(this.x, this.y);
};
