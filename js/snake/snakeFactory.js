
const SnakeFactory = {
    DEBUG: 0,
    NORMAL: 1,
    SMOOTH: 2,
    YOKOMUKUNDAYO90DO: 3,

    create: function(type) {
        const snake = new Snake();

        switch (type) {
            case SnakeFactory.DEBUG:
                snake.drawer = DebugSnakeDrawer;
                break;
            case SnakeFactory.SMOOTH:
                snake.drawer = SmoothSnakeDrawer;
                break;
            case SnakeFactory.YOKOMUKUNDAYO90DO:
                snake.headAngle = new Regular4nPolygon(4);
                break;
            case SnakeFactory.NORMAL:
            default:
        }

        return snake;
    }
};


