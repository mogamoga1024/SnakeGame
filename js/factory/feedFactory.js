
const FeedFactory = {
    NORMAL: 0,
    NO_STROKE: 1,

    create: function(type, x, y, radius) {
        const feed = new Feed(x, y, radius);

        switch (type) {
            case FeedFactory.NO_STROKE:
                feed.drawer = NoStrokeFeedDrawer;
                break;
            case FeedFactory.NO_STROKE:
            default:
        }

        return feed;
    }
};
