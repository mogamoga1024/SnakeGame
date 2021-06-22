
function Snake() {
    this.headPotision = new Position(100, 100);
    this.partsRadius = 25;
    this.bodyCount = 0;
    this.bodyPotisionArray = [];
    this.headDegree = 0;
    this.oldHeadDegree = null;
    this.speed = 4;
    this.rotationDegree = 3; // 90の約数であること
    this.traceQueue = []

    this.traceQueue.push(new Position(this.headPotision.x, this.headPotision.y));
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
    let shouldPlusRotate = false;
    let shouldMinusRotate = false;

    if (scene.latestKeyCode === UP_ARROW || scene.latestKeyCode === null && scene.isPressingUpArrow) {
        shouldPlusRotate = DegreeUtils.existInAngularRange(this.headDegree, 90, 270);
        shouldMinusRotate = DegreeUtils.existInAngularRange(this.headDegree, 270, 90);
    }
    else if (scene.latestKeyCode === DOWN_ARROW || scene.latestKeyCode === null && scene.isPressingDownArrow) {
        shouldPlusRotate = DegreeUtils.existInAngularRange(this.headDegree, 270, 90);
        shouldMinusRotate = DegreeUtils.existInAngularRange(this.headDegree, 90, 270);
    }
    else if (scene.latestKeyCode === LEFT_ARROW || scene.latestKeyCode === null && scene.isPressingLeftArrow) {
        shouldPlusRotate = DegreeUtils.existInAngularRange(this.headDegree, 0, 180);
        shouldMinusRotate = DegreeUtils.existInAngularRange(this.headDegree, 180);
    }
    else if (scene.latestKeyCode === RIGHT_ARROW || scene.latestKeyCode === null && scene.isPressingRightArrow) {
        shouldPlusRotate = DegreeUtils.existInAngularRange(this.headDegree, 180);
        shouldMinusRotate = DegreeUtils.existInAngularRange(this.headDegree, 0, 180);
    }
    else {
        return;
    }

    if (shouldPlusRotate) {
        this.headDegree = DegreeUtils.plusRotate(this.headDegree, this.rotationDegree);
    }
    else if (shouldMinusRotate) {
        this.headDegree = DegreeUtils.minusRotate(this.headDegree, this.rotationDegree);
    }

    if (this.oldHeadDegree != this.headDegree) {
        this.oldHeadDegree = this.headDegree;
        this.traceQueue.push(this.headPotision.clone());
    }
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
            let locusFrontPoint;
            if (traceQueueIndex === this.traceQueue.length - 1) {
                locusFrontPoint = basePosition;
            }
            else {
                locusFrontPoint = this.traceQueue[traceQueueIndex + 1];
            }

            const locusBackPoint = this.traceQueue[traceQueueIndex];

            backBodyPosition = this.getBackBodyPosition(basePosition, locusFrontPoint, locusBackPoint);

            if (backBodyPosition != null) {
                break;
            }

            traceQueueIndex--;
        }

        if (backBodyPosition != null) {
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

Snake.prototype.getBackBodyPosition = function(basePosition, locusFrontPoint, locusBackPoint) {
    let backBodyX, backBodyY;

    const r = this.partsRadius * 2;
    const c = basePosition.x;
    const d = basePosition.y;

    if (locusBackPoint.x === locusFrontPoint.x) {
        const tmpBodyY1 = d - sqrt(pow(r, 2) - pow(locusFrontPoint.x - c, 2));
        const tmpBodyY2 = d + sqrt(pow(r, 2) - pow(locusFrontPoint.x - c, 2));

        let minY, maxY;
        if (locusBackPoint.y < locusFrontPoint.y) {
            minY = locusBackPoint.y;
            maxY = locusFrontPoint.y;
        }
        else {
            minY = locusFrontPoint.y;
            maxY = locusBackPoint.y;
        }

        let existsTmpBodyY1InLocus = minY <= tmpBodyY1 && tmpBodyY1 <= maxY;
        let existsTmpBodyY2InLocus = minY <= tmpBodyY2 && tmpBodyY2 <= maxY;

        if (existsTmpBodyY1InLocus && existsTmpBodyY2InLocus) {
            if (abs(locusBackPoint.y - tmpBodyY1) < abs(locusBackPoint.y - tmpBodyY2)) {
                backBodyY = tmpBodyY1;
            }
            else {
                backBodyY = tmpBodyY2;
            }
        }
        else if (existsTmpBodyY1InLocus) {
            backBodyY = tmpBodyY1;
        }
        else if (existsTmpBodyY2InLocus) {
            backBodyY = tmpBodyY2;
        }
        else {
            return null;
        }

        backBodyX = locusFrontPoint.x;
    }
    else {
        const a = (locusFrontPoint.y - locusBackPoint.y) / (locusFrontPoint.x - locusBackPoint.x);
        const b = locusFrontPoint.y - a * locusFrontPoint.x;

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
        if (locusBackPoint.x < locusFrontPoint.x) {
            minX = locusBackPoint.x;
            maxX = locusFrontPoint.x;
        }
        else {
            minX = locusFrontPoint.x;
            maxX = locusBackPoint.x;
        }

        const existsTmpBodyX1InLocus = minX <= tmpBodyX1 && tmpBodyX1 <= maxX;
        const existsTmpBodyX2InLocus = minX <= tmpBodyX2 && tmpBodyX2 <= maxX;

        if (existsTmpBodyX1InLocus && existsTmpBodyX2InLocus) {
            if (abs(locusBackPoint.x - tmpBodyX1) < abs(locusBackPoint.x - tmpBodyX2)) {
                backBodyX = tmpBodyX1;
            }
            else {
                backBodyX = tmpBodyX2;
            }
        }
        else if (existsTmpBodyX1InLocus) {
            backBodyX = tmpBodyX1;
        }
        else if (existsTmpBodyX2InLocus) {
            backBodyX = tmpBodyX2;
        }
        else {
            return null;
        }

        backBodyY = a * backBodyX + b;
    }

    const distanceFromLocusBackPointToBasePosition = dist(locusBackPoint.x, locusBackPoint.y, basePosition.x, basePosition.y);
    const distanceFromLocusBackPointToBackBodyPosition = dist(locusBackPoint.x, locusBackPoint.y, backBodyX, backBodyY);

    if (distanceFromLocusBackPointToBasePosition < distanceFromLocusBackPointToBackBodyPosition) {
        return null;
    }

    return new Position(backBodyX, backBodyY);
};

