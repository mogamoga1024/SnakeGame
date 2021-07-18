
function Regular4nPolygonAngle(n) {
    if (n % 4 !== 0) {
        throw new Error("引数のnは4の倍数であること。");
    }

    this.DEGREE_0 = 0;
    this.DEGREE_90 = n / 4;
    this.DEGREE_180 = n / 2;
    this.DEGREE_270 = n * 3 / 4;

    this.N = n;
    this.index = 0;
}

Regular4nPolygonAngle.prototype.shift = function(direction) {
    if (direction > 0) {
        this.index = (this.index + 1) % this.N;
    }
    else if (direction < 0) {
        this.index = (this.index - 1 + this.N) % this.N;
    }
};

Regular4nPolygonAngle.prototype.equals90nDegree = function(degree) {
    if (
        degree !== this.DEGREE_0   && degree !== this.DEGREE_90  &&
        degree !== this.DEGREE_180 && degree !== this.DEGREE_270
    ) {
        throw new Error("オブジェクトで定義されているDEGREE_XXを引数を利用すること。");
    }

    return this.index === degree;
};

Regular4nPolygonAngle.prototype.existIn90nDegreeRange = function(startDegree, endDegree) {
    if (
        startDegree !== this.DEGREE_0   && startDegree !== this.DEGREE_90  &&
        startDegree !== this.DEGREE_180 && startDegree !== this.DEGREE_270 &&
        endDegree   !== this.DEGREE_0   && endDegree   !== this.DEGREE_90  &&
        endDegree   !== this.DEGREE_180 && endDegree   !== this.DEGREE_270
    ) {
        throw new Error("オブジェクトで定義されているDEGREE_XXを引数を利用すること。");
    }

    if (startDegree < endDegree) {
        return startDegree < this.index && this.index < endDegree;
    }
    else if (startDegree > endDegree) {
        return startDegree < this.index || this.index < endDegree;
    }
    return false;
};

Regular4nPolygonAngle.prototype.toRadian = function() {
    return this.index * 2 * PI / this.N;
};

