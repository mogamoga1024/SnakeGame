
function Snake($snake) {
    this.headPosition = new Position(100, 100);
    this.tailPosition = this.headPosition.clone();
    this.radius = 25;
    this.bodyCount = 0;
    this.headAngle = new Regular4nPolygon(25);
    this.speed = 5;
    this.canvasWidth = $svg.width();
    this.canvasHeight = $svg.height();
    this.trace = [];

    this.trace.push(this.headPosition.clone());

    this.$snake = $snake;
    this.$snake.attr({
        "stroke": "green",
        "stroke-width": this.radius * 2,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "fill": "none",
        "stroke-opacity": 0.8
    });
}

Snake.prototype.draw = function() {
    this.updateTailPosition();

    // todo リファ

    let d = "M" + this.headPosition.x + "," + this.headPosition.y;
    if (this.bodyCount === 0) {
        d += "L" + this.headPosition.x + "," + this.headPosition.y;
    }
    else {
        const lastTraceIndex = this.trace.length - 1;
        if (this.trace.length === 1) {
            d += "L" + this.tailPosition.x + "," + this.tailPosition.y;
        }
        else {
            d += "L" + this.trace[0].x + "," + this.trace[0].y;
        }
        for (let i = 0; i < lastTraceIndex; i++) {
            if (i === lastTraceIndex - 1) {
                d += "L" + this.tailPosition.x + "," + this.tailPosition.y;
                break;
            }
            else {
                d += "L" + this.trace[i + 1].x + "," + this.trace[i + 1].y;
            }
        }
    }
    this.$snake.attr("d", d);
};

Snake.prototype.headDegreeChangeByKeyCode = function(keyCode) {
    let rotationDirection;

    if (keyCode === KEY_CODE.UP_ARROW) {
        rotationDirection = this.findRotationDirection(
            this.headAngle.DEGREE_90,
            this.headAngle.DEGREE_270
        );
    }
    else if (keyCode === KEY_CODE.DOWN_ARROW) {
        rotationDirection = this.findRotationDirection(
            this.headAngle.DEGREE_270,
            this.headAngle.DEGREE_90
        );
    }
    else if (keyCode === KEY_CODE.LEFT_ARROW) {
        rotationDirection = this.findRotationDirection(
            this.headAngle.DEGREE_0,
            this.headAngle.DEGREE_180
        );
    }
    else if (keyCode === KEY_CODE.RIGHT_ARROW) {
        rotationDirection = this.findRotationDirection(
            this.headAngle.DEGREE_180,
            this.headAngle.DEGREE_0
        );
    }
    else {
        return;
    }

    if (rotationDirection !== 0) {
        this.headAngle.shift(rotationDirection);
        this.trace.unshift(this.headPosition.clone());
    }
};

Snake.prototype.findRotationDirection = function(startDegree, endDegree) {
    if (this.headAngle.equals90nDegree(startDegree) || this.headAngle.equals90nDegree(endDegree)) {
        return 0;
    }
    if (this.headAngle.existIn90nDegreeRange(startDegree, endDegree)) {
        return 1;
    }
    return -1;
};

Snake.prototype.isHittingWall = function() {
    if (
        this.headPosition.x - this.radius <= 0 ||
        this.headPosition.y - this.radius <= 0 ||
        this.headPosition.x + this.radius >= this.canvasWidth ||
        this.headPosition.y + this.radius >= this.canvasHeight
    ) {
        return true;
    }
    return false;
};

Snake.prototype.isHittingBody = function() {
    return false;
};

Snake.prototype.canEatFeed = function(feed) {
    return this.headPosition.distance(feed.position) <= this.radius + feed.radius;
};

Snake.prototype.move = function() {
    this.headPosition.x += this.speed * Math.cos(this.headAngle.toRadian());
    this.headPosition.y += this.speed * Math.sin(this.headAngle.toRadian());
};

Snake.prototype.updateTailPosition = function() {
    if (this.bodyCount === 0) return;

    const snakeLength = 2 * this.radius * this.bodyCount;
    let tmpSnakeLength =  0;
    let joint = this.headPosition;
    let index = 0;
    while (true) {
        const nextJoint = this.trace[index];
        const preTmpSnakeLength = tmpSnakeLength;
        tmpSnakeLength += joint.distance(nextJoint);
        if (tmpSnakeLength === snakeLength) {
            this.tailPosition.x = nextJoint.x;
            this.tailPosition.y = nextJoint.y;
            break;
        }
        else if (tmpSnakeLength > snakeLength) {
            const remainingSnakeLenght = snakeLength - preTmpSnakeLength;

            if (joint.x === nextJoint.x) {
                this.tailPosition.x = joint.x;
                if (joint.y < nextJoint.y) {
                    this.tailPosition.y = joint.y + remainingSnakeLenght;
                }
                else {
                    this.tailPosition.y = joint.y - remainingSnakeLenght;
                }
            }
            else {
                const absC = nextJoint.distance(joint);
                const a = nextJoint.x - joint.x;
                const b = nextJoint.y - joint.y;

                this.tailPosition.x = joint.x + (a / absC) * remainingSnakeLenght;
                this.tailPosition.y = joint.y + (b / absC) * remainingSnakeLenght;
            }
            break;
        }

        if (index === this.trace.length - 1) {
            break;
        }

        joint = nextJoint;
        index++;
    }

    if (index < this.trace.length - 1) {
        this.trace.splice(index + 1);
    }
};

Snake.prototype.eatFeed = function(feed) {
    feed.eaten(this);
};
