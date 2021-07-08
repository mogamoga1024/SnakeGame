
const FeedDrawer = {
    draw: function(feed) {
        push();
        fill(103, 43, 67);
        ellipse(feed.position.x, feed.position.y, feed.radius * 2);
        pop();
    }
};

const NoStrokeFeedDrawer = {
    draw: function(feed) {
        push();
        noStroke();
        fill(103, 43, 67);
        ellipse(feed.position.x, feed.position.y, feed.radius * 2);
        pop();
    }
};

