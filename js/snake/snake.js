
function Snake() {
    this.headPotision = new Position(100, 100);
    this.partsRadius = 25;
    this.bodyCount = 0;
    this.bodyPotisionArray = [];
    this.headAngle = new Regular4nPolygon(25 * 4);
    this.speed = 5;
    this.drawer = SnakeDrawer;
    this.traceQueue = [];

    this.traceQueue.push(this.headPotision.clone());
}

Snake.prototype.draw = function() {
    this.drawer.draw(this);
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
        this.traceQueue.push(this.headPotision.clone());
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
        this.headPotision.x - this.partsRadius <= 0     ||
        this.headPotision.y - this.partsRadius <= 0     ||
        this.headPotision.x + this.partsRadius >= width ||
        this.headPotision.y + this.partsRadius >= height
    ) {
        return true;
    }
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
    this.headPotision.x += this.speed * cos(this.headAngle.toRadian());
    this.headPotision.y += this.speed * sin(this.headAngle.toRadian());

    this.bodyPotisionArray = [];

    let traceQueueIndex     = this.traceQueue.length - 1;
    let currentBodyPosition = this.headPotision;
    let traceFrontPosition  = this.headPotision;

    while (this.bodyPotisionArray.length < this.bodyCount && traceQueueIndex >= 0) {
        const traceBackPosition = this.traceQueue[traceQueueIndex];
        const backBodyPosition = this.getBackBodyPosition(currentBodyPosition, traceFrontPosition, traceBackPosition);

        if (backBodyPosition !== null) {
            currentBodyPosition = backBodyPosition;
            this.bodyPotisionArray.push(currentBodyPosition.clone());
            continue;
        }

        traceFrontPosition = traceBackPosition;
        traceQueueIndex--;
    }

    if (traceQueueIndex > 0) {
        this.traceQueue.splice(0, traceQueueIndex);
    }
};

Snake.prototype.eatFeed = function(feed) {
    feed.nourish(this);
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

