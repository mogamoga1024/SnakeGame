
function Feed() {
    this.position = null;
    this.radius = 20;
    this.drawer = FeedDrawer;
}

Feed.UNTIL_NOURISH_COUNT = 10; // default 10

Feed.prototype.draw = function() {
    //this.drawer.draw(this);

    feedCanvas.push();
    feedCanvas.noStroke();
    feedCanvas.fill(103, 43, 67);
    feedCanvas.ellipse(this.position.x, this.position.y, this.radius * 2);
    feedCanvas.pop();
};

Feed.prototype.nourish = function(snake) {
    snake.bodyCount++;

    if (snake.bodyCount % Feed.UNTIL_NOURISH_COUNT === 0) {
        //*
        if (snake.speed < 10) {
            snake.speed += 1;
            if (snake.headAngle.N > 12) {
                snake.headAngle.convertRegular4nPolygon(snake.headAngle.N - 12);
            }
        }
        //*/
        if (snake.radius > 15) {
            snake.radius *= 0.95;
            this.radius *= 0.95;
        }
    }
};
