
const SnakeDrawer = {
    draw: function(snake) {
        push();
        colorMode(HSB, 360, 100, 100);
    
        fill(360, 100, 100);
        ellipse(snake.headPotision.x, snake.headPotision.y, snake.partsRadius * 2);
    
        for (let i = 0; i < snake.bodyPotisionArray.length; i++) {
            fill(360 * (1 - (i + 1) / (snake.bodyPotisionArray.length + 1)), 100, 100);
            ellipse(snake.bodyPotisionArray[i].x, snake.bodyPotisionArray[i].y, snake.partsRadius * 2);
        }
        pop();
    }
};

const SmoothSnakeDrawer = {
    draw: function(snake) {
        push();
        if (snake.bodyPotisionArray.length === 0) {
            noStroke();
            fill(127 , 255, 127);
            ellipse(snake.headPotision.x, snake.headPotision.y, snake.partsRadius * 2);
        }
        else {
            strokeWeight(snake.partsRadius * 2);
            stroke(127 , 255, 127);
            line(snake.headPotision.x, snake.headPotision.y, snake.bodyPotisionArray[0].x, snake.bodyPotisionArray[0].y);
            for (let i = 0; i < snake.bodyPotisionArray.length - 1; i++) {
                line(snake.bodyPotisionArray[i].x, snake.bodyPotisionArray[i].y, snake.bodyPotisionArray[i + 1].x, snake.bodyPotisionArray[i + 1].y);
            }
        }
        pop();
    }
};

const DebugSnakeDrawer = {
    draw: function(snake) {
        push();
        fill(0, 150, 0);
        ellipse(snake.headPotision.x, snake.headPotision.y, snake.partsRadius * 2);
    
        for (let i = 0; i < snake.bodyPotisionArray.length; i++) {
            fill(0, 150, 0);
            ellipse(snake.bodyPotisionArray[i].x, snake.bodyPotisionArray[i].y, snake.partsRadius * 2);
    
            fill(255);
            textAlign(CENTER, CENTER);
            textSize(30);
            text(i, snake.bodyPotisionArray[i].x, snake.bodyPotisionArray[i].y);
        }
    
        stroke(255, 0, 0);
        strokeWeight(4);
        const lastTracePotision = snake.traceQueue[snake.traceQueue.length - 1];
        line(snake.headPotision.x, snake.headPotision.y, lastTracePotision.x, lastTracePotision.y);
        for (let i = 0; i < snake.traceQueue.length - 1; i++) {
            line(snake.traceQueue[i].x, snake.traceQueue[i].y, snake.traceQueue[i + 1].x, snake.traceQueue[i + 1].y);
        }
        pop();
    }
};
