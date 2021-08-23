

const $window = $(window);
const $svg = $("svg");

$svg.css("top", ($window.height() - $svg.height()) / 2);
$svg.css("left", ($window.width() - $svg.width()) / 2);


