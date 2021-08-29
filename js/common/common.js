
const $window = $(window);
const $svg = $("svg");

function canvasToCenter() {
    $svg.css("top", ($window.height() - $svg.height()) / 2);
    $svg.css("left", ($window.width() - $svg.width()) / 2);
}

// 0以上max未満の整数の乱数
Math.randomInt = function(max) {
    return Math.floor(Math.random() * max);
};
