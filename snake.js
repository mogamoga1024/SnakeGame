
function Snake() {
    this.headPotision = {x: 100, y: 100};
    this.partsRadius = 25;
    this.bodyCount = 0;
    this.bodyPotisionArray = [];
    this.degree = 0;
    this.oldDegree = null;
    this.speed = 4;
    this.rotationDegree = 3;
    this.traceQueue = []

    this.traceQueue.push({x: this.headPotision.x, y: this.headPotision.y});
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

Snake.prototype.degreeChangeByKey = function() {
    let shouldPlusRotate = false;
    let shouldMinusRotate = false;

    if (latestKeyCode === UP_ARROW || latestKeyCode === null && isPressingUpArrow) {
        shouldPlusRotate = DegreeUtils.existInAngularRange(this.degree, 90, 270);
        shouldMinusRotate = DegreeUtils.existInAngularRange(this.degree, 270, 90);
    }
    else if (latestKeyCode === DOWN_ARROW || latestKeyCode === null && isPressingDownArrow) {
        shouldPlusRotate = DegreeUtils.existInAngularRange(this.degree, 270, 90);
        shouldMinusRotate = DegreeUtils.existInAngularRange(this.degree, 90, 270);
    }
    else if (latestKeyCode === LEFT_ARROW || latestKeyCode === null && isPressingLeftArrow) {
        shouldPlusRotate = DegreeUtils.existInAngularRange(this.degree, 0, 180);
        shouldMinusRotate = DegreeUtils.existInAngularRange(this.degree, 180);
    }
    else if (latestKeyCode === RIGHT_ARROW || latestKeyCode === null && isPressingRightArrow) {
        shouldPlusRotate = DegreeUtils.existInAngularRange(this.degree, 180);
        shouldMinusRotate = DegreeUtils.existInAngularRange(this.degree, 0, 180);
    }
    else {
        return;
    }

    if (shouldPlusRotate) {
        this.degree = DegreeUtils.plusRotate(this.degree, this.rotationDegree);
    }
    else if (shouldMinusRotate) {
        this.degree = DegreeUtils.minusRotate(this.degree, this.rotationDegree);
    }

    if (this.oldDegree != this.degree) {
        this.oldDegree = this.degree;
        this.traceQueue.push({x: this.headPotision.x, y: this.headPotision.y});
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
    this.headPotision.x += this.speed * cos(this.degree);
    this.headPotision.y += this.speed * sin(this.degree);

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
            this.bodyPotisionArray.push({x: backBodyPosition.x, y: backBodyPosition.y});
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
        tmpBodyY1 = d - sqrt(pow(r, 2) - pow(locusFrontPoint.x - c, 2));
        tmpBodyY2 = d + sqrt(pow(r, 2) - pow(locusFrontPoint.x - c, 2));

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
        let tmpBodyX1, tmpBodyX2;
        const a = (locusFrontPoint.y - locusBackPoint.y) / (locusFrontPoint.x - locusBackPoint.x);
        const b = locusFrontPoint.y - a * locusFrontPoint.x;

        if (a === 0) {
            tmpBodyX1 = c - sqrt(pow(r, 2) - pow(locusFrontPoint.y - d, 2));
            tmpBodyX2 = c + sqrt(pow(r, 2) - pow(locusFrontPoint.y - d, 2));
        }
        else {
            const A = pow(a, 2) + 1;
            const B = a * (b - d) - c;
            const C = pow(b - d, 2) + pow(c, 2) - pow(r, 2);

            const D = sqrt(pow(B, 2) - A * C);

            if (isNaN(D)) {
                return null;
            }

            tmpBodyX1 = (-B - D) / A;
            tmpBodyX2 = (-B + D) / A;
        }

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

    return {x: backBodyX, y: backBodyY};
};
