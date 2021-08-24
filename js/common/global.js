
const $window = $(window);
const $svg = $("svg");

// min以上max未満の整数の乱数
Math.randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
