
function Snake() {
    this.headPotision = new Position(100, 100);
    this.partsRadius = 25;
    this.bodyCount = 0;
    this.bodyPotisionArray = [];
    this.headDegree = 0;
    this.speed = 5;
    this.rotationDegree = 3; // 90の約数であること
    this.traceQueue = []

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
    let rotationDirection = 0;

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
        if (dist(this.headPotision.x, this.headPotision.y, bodyPotision.x, bodyPotision.y) <= this.partsRadius * 2) {
            return true;
        }
    }
    return false;
};

Snake.prototype.canEatFeed = function(feed) {
    return dist(this.headPotision.x, this.headPotision.y, feed.x, feed.y) <= this.partsRadius + feed.radius;
};

Snake.prototype.move = function() {
    this.headPotision.x += this.speed * cos(this.headDegree);
    this.headPotision.y += this.speed * sin(this.headDegree);

    let basePosition = this.headPotision;
    let traceQueueIndex = this.traceQueue.length - 1;
    this.bodyPotisionArray = [];

    for (let bodyIndex = 0; bodyIndex < this.bodyCount; bodyIndex++) {

        let backBodyPosition = null;
        while (traceQueueIndex >= 0) {
            let traceFrontPoint;
            if (traceQueueIndex === this.traceQueue.length - 1) {
                traceFrontPoint = basePosition;
            }
            else {
                traceFrontPoint = this.traceQueue[traceQueueIndex + 1];
            }

            const traceBackPoint = this.traceQueue[traceQueueIndex];

            backBodyPosition = this.getBackBodyPosition(basePosition, traceFrontPoint, traceBackPoint);

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

        basePosition = backBodyPosition;
    }

    if (traceQueueIndex > 0) {
        this.traceQueue.splice(0, traceQueueIndex);
    }
};

Snake.prototype.eatFeed = function() {
    this.bodyCount++;
    this.speed += 0.2;
};

Snake.prototype.getBackBodyPosition = function(basePosition, traceFrontPoint, traceBackPoint) {
    let backBodyX, backBodyY;

    const r = this.partsRadius * 2;
    const c = basePosition.x;
    const d = basePosition.y;

    if (traceBackPoint.x === traceFrontPoint.x) {
        const tmpBodyY1 = d - sqrt(pow(r, 2) - pow(traceFrontPoint.x - c, 2));
        const tmpBodyY2 = d + sqrt(pow(r, 2) - pow(traceFrontPoint.x - c, 2));

        let minY, maxY;
        if (traceBackPoint.y < traceFrontPoint.y) {
            minY = traceBackPoint.y;
            maxY = traceFrontPoint.y;
        }
        else {
            minY = traceFrontPoint.y;
            maxY = traceBackPoint.y;
        }

        let existsTmpBodyY1InTrace = minY <= tmpBodyY1 && tmpBodyY1 <= maxY;
        let existsTmpBodyY2InTrace = minY <= tmpBodyY2 && tmpBodyY2 <= maxY;

        if (existsTmpBodyY1InTrace && existsTmpBodyY2InTrace) {
            if (abs(traceBackPoint.y - tmpBodyY1) < abs(traceBackPoint.y - tmpBodyY2)) {
                backBodyY = tmpBodyY1;
            }
            else {
                backBodyY = tmpBodyY2;
            }
        }
        else if (existsTmpBodyY1InTrace) {
            backBodyY = tmpBodyY1;
        }
        else if (existsTmpBodyY2InTrace) {
            backBodyY = tmpBodyY2;
        }
        else {
            return null;
        }

        backBodyX = traceFrontPoint.x;
    }
    else {
        const a = (traceFrontPoint.y - traceBackPoint.y) / (traceFrontPoint.x - traceBackPoint.x);
        const b = traceFrontPoint.y - a * traceFrontPoint.x;

        const A = pow(a, 2) + 1;
        const B = a * (b - d) - c;
        const C = pow(b - d, 2) + pow(c, 2) - pow(r, 2);
        const D = sqrt(pow(B, 2) - A * C);

        if (isNaN(D)) {
            return null;
        }

        const tmpBodyX1 = (-B - D) / A;
        const tmpBodyX2 = (-B + D) / A;

        let minX, maxX;
        if (traceBackPoint.x < traceFrontPoint.x) {
            minX = traceBackPoint.x;
            maxX = traceFrontPoint.x;
        }
        else {
            minX = traceFrontPoint.x;
            maxX = traceBackPoint.x;
        }

        const existsTmpBodyX1InTrace = minX <= tmpBodyX1 && tmpBodyX1 <= maxX;
        const existsTmpBodyX2InTrace = minX <= tmpBodyX2 && tmpBodyX2 <= maxX;

        if (existsTmpBodyX1InTrace && existsTmpBodyX2InTrace) {
            if (abs(traceBackPoint.x - tmpBodyX1) < abs(traceBackPoint.x - tmpBodyX2)) {
                backBodyX = tmpBodyX1;
            }
            else {
                backBodyX = tmpBodyX2;
            }
        }
        else if (existsTmpBodyX1InTrace) {
            backBodyX = tmpBodyX1;
        }
        else if (existsTmpBodyX2InTrace) {
            backBodyX = tmpBodyX2;
        }
        else {
            return null;
        }

        backBodyY = a * backBodyX + b;
    }

    const distanceFromTraceBackPointToBasePosition = dist(traceBackPoint.x, traceBackPoint.y, basePosition.x, basePosition.y);
    const distanceFromTraceBackPointToBackBodyPosition = dist(traceBackPoint.x, traceBackPoint.y, backBodyX, backBodyY);

    if (distanceFromTraceBackPointToBasePosition < distanceFromTraceBackPointToBackBodyPosition) {
        return null;
    }

    return new Position(backBodyX, backBodyY);
};

