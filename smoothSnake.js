
function SmoothSnake() {
    Snake.call(this);
}

SmoothSnake.prototype = Object.create(Snake.prototype);
SmoothSnake.prototype.constructor = SmoothSnake;

SmoothSnake.prototype.draw = function() {
    push();
    
    if (this.bodyPotisionArray.length === 0) {
        noStroke();
        fill(127 , 255, 127);
        ellipse(this.headPotision.x, this.headPotision.y, this.partsRadius * 2);
    }
    else {
        strokeWeight(this.partsRadius * 2);
        stroke(127 , 255, 127);
        line(this.headPotision.x, this.headPotision.y, this.bodyPotisionArray[0].x, this.bodyPotisionArray[0].y);
        for (let i = 0; i < this.bodyPotisionArray.length - 1; i++) {
            line(this.bodyPotisionArray[i].x, this.bodyPotisionArray[i].y, this.bodyPotisionArray[i + 1].x, this.bodyPotisionArray[i + 1].y);
        }
    }

    pop();
};

