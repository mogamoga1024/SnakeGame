
function Regular4nPolygonDegree(n) {
    this.DEGREE_0 = 0;
    this.DEGREE_90 = n;
    this.DEGREE_180 = n * 2;
    this.DEGREE_270 = n * 3;

    this.N = n * 4;
    this.index = 0;
    this.centralAngle = Math.PI / (n * 2);
}

Regular4nPolygonDegree.prototype.shift = function(direction) {
    if (direction > 0) {
        this.index = (this.index + 1) % this.N;
    }
    else if (direction < 0) {
        this.index = (this.index - 1 + this.N) % this.N;
    }
};

Regular4nPolygonDegree.prototype.equals90nDegree = function(degree) {
    if (this.isDEGREE_XX(degree) === false) {
        throw new Error("オブジェクトで定義されているDEGREE_XXを引数を利用すること。");
    }

    return this.index === degree;
};

Regular4nPolygonDegree.prototype.existIn90nDegreeRange = function(startDegree, endDegree) {
    if (this.isDEGREE_XX(startDegree) === false || this.isDEGREE_XX(endDegree) === false) {
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

Regular4nPolygonDegree.prototype.isDEGREE_XX = function(degree) {
    if (
        degree === this.DEGREE_0   || degree === this.DEGREE_90  ||
        degree === this.DEGREE_180 || degree === this.DEGREE_270
    ) {
        return true;
    }
    return false;
};

Regular4nPolygonDegree.prototype.toRadian = function() {
    return this.index * 2 * Math.PI / this.N;
};

Regular4nPolygonDegree.prototype.convertRegular4nPolygon = function(n) {
    const radian = this.toRadian();
    Regular4nPolygonDegree.call(this, n);
    this.index = Math.round(radian / this.centralAngle) % this.N;
};

