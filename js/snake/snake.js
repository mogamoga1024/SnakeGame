
function Snake() {
    this.headPotision = new Position(100, 100);
    this.partsRadius = 25;
    this.bodyCount = 0;
    this.bodyPotisionArray = [];
    this.headDegree = 0;
    this.speed = 5;
    this.rotationDegree = 3; // 90の約数であること
    this.traceQueue = [];

    this.traceQueue.push(this.headPotision.clone());
}

Snake.prototype.draw = function() {
    push();
    colorMode(HSB, 360, 100, 100);

    fill(360, 100, 100);
    ellipse(this.headPotision.x, this.headPotision.y, this.partsRadius * 2);

    for (let i = 0; i < this.bodyPotisionArray.length; i++) {
        fill(360 * (1 - (i + 1) / (this.bodyPotisionArray.length + 1)), 100, 100);
        ellipse(this.bodyPotisionArray[i].x, this.bodyPotisionArray[i].y, this.partsRadius * 2);
    }
    pop();
};

Snake.prototype.headDegreeChangeByKey = function(scene) {
    let rotationDirection;

    if (scene.firstKeyCode === UP_ARROW) {
        rotationDirection = this.findRotationDirection(this.headDegree, 90, 270);
    }
    else if (scene.firstKeyCode === DOWN_ARROW) {
        rotationDirection = this.findRotationDirection(this.headDegree, 270, 90);
    }
    else if (scene.firstKeyCode === LEFT_ARROW) {
        rotationDirection = this.findRotationDirection(this.headDegree, 0, 180);
    }
    else if (scene.firstKeyCode === RIGHT_ARROW) {
        rotationDirection = this.findRotationDirection(this.headDegree, 180, 0);
    }
    else {
        return;
    }

    if (rotationDirection !== 0) {
        this.headDegree = DegreeUtils.add(this.headDegree, rotationDirection * this.rotationDegree);
        this.traceQueue.push(this.headPotision.clone());
    }
};

Snake.prototype.findRotationDirection = function(targetDegree, startDegree, endDegree) {
    if (targetDegree === startDegree || targetDegree === endDegree) {
        return 0;
    }
    if (DegreeUtils.existInAngularRange(targetDegree, startDegree, endDegree)) {
        return 1;
    }
    return -1;
};

Snake.prototype.isHittingWall = function() {
    if (this.headPotision.x - this.partsRadius <= 0) return true;
    if (this.headPotision.y - this.partsRadius <= 0) return true;
    if (this.headPotision.x + this.partsRadius >= width) return true;
    if (this.headPotision.y + this.partsRadius >= height) return true;
    return false;
};

Snake.prototype.isHittingBody = function() {
    for (let i = 1; i < this.bodyPotisionArray.length; i++) {
        const bodyPotision = this.bodyPotisionArray[i];
        if (this.headPotision.distance(bodyPotision) <= this.partsRadius * 2) {
            return true;
        }
    }
    return false;
};

Snake.prototype.canEatFeed = function(feed) {
    return this.headPotision.distance(feed.position) <= this.partsRadius + feed.radius;
};

Snake.prototype.move = function() {
    this.headPotision.x += this.speed * cos(this.headDegree);
    this.headPotision.y += this.speed * sin(this.headDegree);

    let frontBodyPosition = this.headPotision;
    let traceQueueIndex = this.traceQueue.length - 1;
    this.bodyPotisionArray = [];

    for (let bodyIndex = 0; bodyIndex < this.bodyCount; bodyIndex++) {

        let backBodyPosition = null;
        while (traceQueueIndex >= 0) {
            let traceFrontPosition;
            if (traceQueueIndex === this.traceQueue.length - 1) {
                traceFrontPosition = frontBodyPosition;
            }
            else {
                traceFrontPosition = this.traceQueue[traceQueueIndex + 1];
            }

            const traceBackPosition = this.traceQueue[traceQueueIndex];

            backBodyPosition = this.getBackBodyPosition(frontBodyPosition, traceFrontPosition, traceBackPosition);

            if (backBodyPosition !== null) {
                break;
            }

            traceQueueIndex--;
        }

        if (backBodyPosition !== null) {
            this.bodyPotisionArray.push(backBodyPosition.clone());
        }
        else {
            break;
        }

        frontBodyPosition = backBodyPosition;
    }

    if (traceQueueIndex > 0) {
        this.traceQueue.splice(0, traceQueueIndex);
    }
};

Snake.prototype.eatFeed = function() {
    this.bodyCount++;
    this.speed += 0.2;
};

Snake.prototype.getBackBodyPosition = function(frontBodyPosition, traceFrontPosition, traceBackPosition) {
    const r = this.partsRadius * 2;

    if (frontBodyPosition.distance(traceBackPosition) < r) {
        return null;
    }

    let backBodyX, backBodyY;

    const c = frontBodyPosition.x;
    const d = frontBodyPosition.y;

    if (traceBackPosition.x === traceFrontPosition.x) {
        const tmpBodyY1 = d - sqrt(pow(r, 2) - pow(traceFrontPosition.x - c, 2));
        const tmpBodyY2 = d + sqrt(pow(r, 2) - pow(traceFrontPosition.x - c, 2));

        if (abs(traceBackPosition.y - tmpBodyY1) < abs(traceBackPosition.y - tmpBodyY2)) {
            backBodyY = tmpBodyY1;
        }
        else {
            backBodyY = tmpBodyY2;
        }

        backBodyX = traceFrontPosition.x;
    }
    else {
        const a = (traceFrontPosition.y - traceBackPosition.y) / (traceFrontPosition.x - traceBackPosition.x);
        const b = traceFrontPosition.y - a * traceFrontPosition.x;

        const A = pow(a, 2) + 1;
        const B = a * (b - d) - c;
        const C = pow(b - d, 2) + pow(c, 2) - pow(r, 2);
        const D = pow(B, 2) - A * C;

        const tmpBodyX1 = (-B - sqrt(D)) / A;
        const tmpBodyX2 = (-B + sqrt(D)) / A;

        if (abs(traceBackPosition.x - tmpBodyX1) < abs(traceBackPosition.x - tmpBodyX2)) {
            backBodyX = tmpBodyX1;
        }
        else {
            backBodyX = tmpBodyX2;
        }

        backBodyY = a * backBodyX + b;
    }

    return new Position(backBodyX, backBodyY);
};

