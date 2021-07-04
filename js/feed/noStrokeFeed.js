
function NoStrokeFeed(x, y, radius) {
    Feed.call(this, x, y, radius);
}

NoStrokeFeed.prototype = Object.create(Feed.prototype);
NoStrokeFeed.prototype.constructor = NoStrokeFeed;

NoStrokeFeed.prototype.draw = function() {
    push();
    noStroke();
    fill(103, 43, 67);
    ellipse(this.x, this.y, this.radius * 2);
    pop();
};
