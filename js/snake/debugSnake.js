
function DebugSnake() {
    Snake.call(this);
}

DebugSnake.prototype = Object.create(Snake.prototype);
DebugSnake.prototype.constructor = DebugSnake;

DebugSnake.prototype.draw = function() {
    push();
    fill(0, 150, 0);
    ellipse(this.headPotision.x, this.headPotision.y, this.partsRadius * 2);

    for (let i = 0; i < this.bodyPotisionArray.length; i++) {
        fill(0, 150, 0);
        ellipse(this.bodyPotisionArray[i].x, this.bodyPotisionArray[i].y, this.partsRadius * 2);

        fill(255);
        textAlign(CENTER, CENTER);
        textSize(30);
        text(i, this.bodyPotisionArray[i].x, this.bodyPotisionArray[i].y);
    }

    stroke(255, 0, 0);
    strokeWeight(4);
    const lastTracePotision = this.traceQueue[this.traceQueue.length - 1];
    line(this.headPotision.x, this.headPotision.y, lastTracePotision.x, lastTracePotision.y);
    for (let i = 0; i < this.traceQueue.length - 1; i++) {
        line(this.traceQueue[i].x, this.traceQueue[i].y, this.traceQueue[i + 1].x, this.traceQueue[i + 1].y);
    }
    pop();
};

