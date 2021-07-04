
function Position(x, y) {
    this.x = x;
    this.y = y;
}

Position.prototype.equals = function(position) {
    return this.x === position.x && this.y === position.y;
};

Position.prototype.distance = function(position) {
    return dist(this.x, this.y, position.x, position.y);
};

Position.prototype.clone = function() {
    return new Position(this.x, this.y);
};
