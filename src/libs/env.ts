export const env = {
    FEED_REDIS_KEY: process.env.FEED_REDIS_KEY || "MY_FEED",
    FEED_MAX_LENGTH: process.env.FEED_MAX_LENGTH || 5,
    FEED_MAX_ITEMS: process.env.FEED_MAX_ITEMS || 5,
    FEED_KEY_NAME: process.env.FEED_KEY_NAME || "action"
};
