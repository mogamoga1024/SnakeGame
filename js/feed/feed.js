
function Feed(radius, x, y, $feed) {
    this.position = new Position(x, y);
    this.radius = radius;

    $feed.attr({
        "cx": this.position.x,
        "cy": this.position.y,
        "r": this.radius,
        "fill": "brown"
    });
}

Feed.UNTIL_NOURISH_COUNT = 10;

// Feed.prototype.draw = function() {
//     //this.drawer.draw(this);
//     /*
//     feedCanvas.push();
//     feedCanvas.noStroke();
//     feedCanvas.fill(103, 43, 67);
//     feedCanvas.ellipse(this.position.x, this.position.y, this.radius * 2);
//     feedCanvas.pop();
//     */
// };

Feed.prototype.nourish = function(snake) {
    snake.bodyCount++;
    //snake.speed += 0.1;

    /*
    if (snake.bodyCount % Feed.UNTIL_NOURISH_COUNT === 0) {
        if (snake.speed < 10) {
            snake.speed += 1;
            if (snake.headAngle.N > 12) {
                snake.headAngle.convertRegular4nPolygon(snake.headAngle.N - 12);
            }
        }
        if (snake.radius > 15) {
            snake.radius *= 0.95;
            this.radius *= 0.95;
        }
    }
    */

    if (snake.trace.length > 0) {
        snake.trace[snake.trace.length - 1].x = snake.tailPosition.x;
        snake.trace[snake.trace.length - 1].y = snake.tailPosition.y;
    }
};
