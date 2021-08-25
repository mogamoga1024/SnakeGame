
const $window = $(window);
const $svg = $("svg");

// 0以上max未満の整数の乱数
Math.randomInt = function(max) {
    return Math.floor(Math.random() * max);
}
