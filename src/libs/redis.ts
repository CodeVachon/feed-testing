import Redis, { RedisOptions } from "ioredis";
import { exit } from "process";

const redisSettings: RedisOptions = {
    port: parseInt(process.env.REDIS_PORT || "6379"),
    host: process.env.REDIS_ADDRESS || "localhost",
    db: parseInt(process.env.REDIS_DB || "0"),
    maxRetriesPerRequest: 5
};

export const getRedisClient = () =>
    new Redis(redisSettings).on("error", (error) => {
        console.error(error);
        exit(1);
    });
