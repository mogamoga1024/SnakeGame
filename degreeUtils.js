
const DegreeUtils = {
    /**
     * startDegree, endDegreまでの角度の範囲にtargetDegreeが含まれているか
     * ただし、startDegree, endDegreは含まない。
     */
    existInAngularRange: function(targetDegree, startDegree, endDegree) {
        targetDegree = DegreeUtils.normalization(targetDegree);
        startDegree = DegreeUtils.normalization(startDegree);
        endDegree = DegreeUtils.normalization(endDegree);

        if (startDegree < endDegree) {
            return startDegree < targetDegree && targetDegree < endDegree;
        }
        else if (startDegree > endDegree) {
            return startDegree < targetDegree || targetDegree < endDegree;
        }
        return false;
    },

    add: function(degree1, degree2) {
        return DegreeUtils.normalization(degree1 + degree2);
    },

    normalization: function(degree) {
        if (degree >= 360) {
            return degree % 360;
        }
        else if (degree < 0) {
            return 360 - (-degree % 360);
        }
        else {
            return degree;
        }
    }
};
