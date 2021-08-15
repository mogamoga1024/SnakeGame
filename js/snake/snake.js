
function Snake() {
    this.headPosition = new Position(100, 100);
    this.tailPosition = this.headPosition.clone();
    this.radius = 25;
    this.bodyCount = 5;
    //this.headAngle = new Regular4nPolygon(25 * 4);
    this.headAngle = new Regular4nPolygon(30 * 4);
    this.speed = 5;
    //this.drawer = SnakeDrawer;
    this.trace = [];

    this.trace.push(this.headPosition.clone());
}

Snake.prototype.draw = function() {
    //this.drawer.draw(this);

    push();
    /*
    if (this.bodyCount === 0) {
        noStroke();
        fill(127 , 255, 127);
        ellipse(this.headPosition.x, this.headPosition.y, this.radius * 2);
    }
    else {
        strokeWeight(this.radius * 2);
        stroke(127 , 255, 127);
        line(this.headPosition.x, this.headPosition.y, this.trace[0].x, this.trace[0].y);
        const lastTraceIndex = this.trace.length - 1;
        for (let i = 0; i < lastTraceIndex; i++) {
            const position1 = this.trace[i];
            let position2;
            if (lastTraceIndex === 0 || i === lastTraceIndex - 1) {
                position2 = this.tailPosition;
            }
            else {
                position2 = this.trace[i + 1];
            }
            line(position1.x, position1.y, position2.x, position2.y);
        }
    }
    */

    //*
    noStroke();
    fill(127 , 127, 255);
    ellipse(this.headPosition.x, this.headPosition.y, this.radius * 2);
    fill(127 , 255, 127);
    ellipse(this.tailPosition.x, this.tailPosition.y, this.radius * 2);

    /*
    // debug start
    stroke(255, 0, 0);
    strokeWeight(4);
    line(this.headPosition.x, this.headPosition.y, this.trace[0].x, this.trace[0].y);
    for (let i = 0; i < this.trace.length - 1; i++) {
        line(this.trace[i].x, this.trace[i].y, this.trace[i + 1].x, this.trace[i + 1].y);
    }
    // debug end
    */

    pop();
};

Snake.prototype.headDegreeChangeByKeyCode = function(scene) {
    let rotationDirection;

    if (scene.firstKeyCode === UP_ARROW) {
        rotationDirection = this.findRotationDirection(
            this.headAngle.DEGREE_90,
            this.headAngle.DEGREE_270
        );
    }
    else if (scene.firstKeyCode === DOWN_ARROW) {
        rotationDirection = this.findRotationDirection(
            this.headAngle.DEGREE_270,
            this.headAngle.DEGREE_90
        );
    }
    else if (scene.firstKeyCode === LEFT_ARROW) {
        rotationDirection = this.findRotationDirection(
            this.headAngle.DEGREE_0,
            this.headAngle.DEGREE_180
        );
    }
    else if (scene.firstKeyCode === RIGHT_ARROW) {
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
        this.headPosition.x - this.radius <= 0     ||
        this.headPosition.y - this.radius <= 0     ||
        this.headPosition.x + this.radius >= width ||
        this.headPosition.y + this.radius >= height
    ) {
        return true;
    }
    return false;
};

Snake.prototype.isHittingBody = function() {
    /*for (let i = 1; i < this.bodyPotisionArray.length; i++) {
        const bodyPotision = this.bodyPotisionArray[i];
        if (this.headPosition.distance(bodyPotision) <= this.radius * 2) {
            return true;
        }
    }
    */
    return false;
};

Snake.prototype.canEatFeed = function(feed) {
    return this.headPosition.distance(feed.position) <= this.radius + feed.radius;
};

Snake.prototype.move = function() {
    this.headPosition.x += this.speed * cos(this.headAngle.toRadian());
    this.headPosition.y += this.speed * sin(this.headAngle.toRadian());

    this.updateTailPosition();
};

let hoge = 0;

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
            console.log(hoge++ + " a: " + tmpSnakeLength);
            this.tailPosition.x = nextJoint.x;
            this.tailPosition.y = nextJoint.y;
            break;
        }
        else if (tmpSnakeLength > snakeLength) {
            const remainingSnakeLenght = snakeLength - preTmpSnakeLength;
            console.log(
                hoge++ + " b: " + (remainingSnakeLenght + preTmpSnakeLength),
                "remain: " + remainingSnakeLenght,
                "pre: " + preTmpSnakeLength
            );

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
            console.log(hoge++ + " c");
            break;
        }

        joint = nextJoint;
        index++;
    }

    if (index < this.trace.length - 1) {
        this.trace.splice(index + 1);
        //console.log(index + 1);
        //console.log(this.trace.concat());
    }
};

Snake.prototype.eatFeed = function(feed) {
    feed.nourish(this);
};
