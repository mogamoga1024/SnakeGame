
function Position(x, y) {
    this.x = x;
    this.y = y;
}

Position.prototype.equals = function(position) {
    return this.x === position.x && this.y === position.y;
};

Position.prototype.distance = function(position) {
    const dx = this.x - position.x;
    const dy = this.y - position.y;
    return Math.sqrt(dx * dx + dy * dy);
};

Position.prototype.clone = function() {
    return new Position(this.x, this.y);
};
