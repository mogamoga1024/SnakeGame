
const SnakeDrawer = {
    draw: function(snake) {
        push();
        colorMode(HSB, 360, 100, 100);
    
        fill(360, 100, 100);
        ellipse(snake.headPotision.x, snake.headPotision.y, snake.radius * 2);
    
        for (let i = 0; i < snake.bodyPotisionArray.length; i++) {
            fill(360 * (1 - (i + 1) / (snake.bodyPotisionArray.length + 1)), 100, 100);
            ellipse(snake.bodyPotisionArray[i].x, snake.bodyPotisionArray[i].y, snake.radius * 2);
        }
        pop();
    }
};

const SmoothSnakeDrawer = {
    draw: function(snake) {
        push();
        if (snake.bodyCount === 0) {
            noStroke();
            fill(127 , 255, 127);
            ellipse(snake.headPotision.x, snake.headPotision.y, snake.radius * 2);
        }
        else {
            strokeWeight(snake.radius * 2);
            stroke(127 , 255, 127);
            line(snake.headPotision.x, snake.headPotision.y, snake.spine[0].x, snake.spine[0].y);
            for (let i = 0; i < snake.spine.length - 1; i++) {
                line(snake.spine[i].x, snake.spine[i].y, snake.spine[i + 1].x, snake.spine[i + 1].y);
            }
        }
        pop();
    }
};

const DebugSnakeDrawer = {
    draw: function(snake) {
        push();
        fill(0, 150, 0);
        ellipse(snake.headPotision.x, snake.headPotision.y, snake.radius * 2);
    
        for (let i = 0; i < snake.bodyPotisionArray.length; i++) {
            fill(0, 150, 0);
            ellipse(snake.bodyPotisionArray[i].x, snake.bodyPotisionArray[i].y, snake.radius * 2);
    
            fill(255);
            textAlign(CENTER, CENTER);
            textSize(30);
            text(i, snake.bodyPotisionArray[i].x, snake.bodyPotisionArray[i].y);
        }
    
        stroke(255, 0, 0);
        strokeWeight(4);
        const lastTracePotision = snake.spine[snake.spine.length - 1];
        line(snake.headPotision.x, snake.headPotision.y, lastTracePotision.x, lastTracePotision.y);
        for (let i = 0; i < snake.spine.length - 1; i++) {
            line(snake.spine[i].x, snake.spine[i].y, snake.spine[i + 1].x, snake.spine[i + 1].y);
        }
        pop();
    }
};

