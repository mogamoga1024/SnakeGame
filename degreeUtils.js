
const DegreeUtils = {
    /**
     * startDegree, endDegreまでの角度の範囲にtargetDegreeが含まれているか
     * ただし、startDegree, endDegreは含まない。
     */
    existInAngularRange: function(targetDegree, startDegree, endDegree) {
        if (endDegree === undefined) endDegree = 360;

        if (startDegree < endDegree) {
            return startDegree < targetDegree && targetDegree < endDegree;
        }
        else {
            return startDegree < targetDegree || targetDegree < endDegree;
        }
    },

    plusRotate: function(degree1, degree2) {
        return (degree1 + degree2) % 360;
    },

    minusRotate: function(degree1, degree2) {
        return (degree1 - degree2 + 360) % 360;
    }    
};
