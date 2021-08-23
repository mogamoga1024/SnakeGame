
function Position(x, y, _isDrawn) {
    this.x = x;
    this.y = y;
    this.isDrawn = (_isDrawn === undefined) ? false : _isDrawn;
}

Position.prototype.equals = function(position) {
    return this.x === position.x && this.y === position.y;
};

Position.prototype.distance = function(position) {
    return dist(this.x, this.y, position.x, position.y);
};

Position.prototype.clone = function() {
    return new Position(this.x, this.y, this.isDrawn);
};
