
const FeedFactory = {
    NORMAL: 0,
    NO_STROKE: 1,

    create: function(type, x, y, radius) {
        let feed;

        switch (type) {
            case FeedFactory.NO_STROKE:
                feed = new NoStrokeFeed(x, y, radius);
                break;
            case FeedFactory.NO_STROKE:
            default:
                feed = new Feed(x, y, radius);
        }

        return feed;
    }
};
