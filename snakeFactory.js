
const SnakeFactory = {
    DEBUG: 0,
    NORMAL: 1,
    SMOOTH: 2,
    YOKOMUKUNDAYO90DO: 3,

    create: function(type) {
        let snake;

        switch (type) {
            case SnakeFactory.DEBUG:
                snake = new DebugSnake();
                break;
            case SnakeFactory.SMOOTH:
                snake = new SmoothSnake();
                break;
            case SnakeFactory.YOKOMUKUNDAYO90DO:
                snake = new Snake();
                snake.rotationDegree = 90;
                break;
            case SnakeFactory.NORMAL:
            default:
                snake =  new Snake();
        }

        return snake;
    }
};


