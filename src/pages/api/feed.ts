import { NextApiRequest, NextApiResponse } from "next";
import { getRedisClient } from "../../libs/redis";
import { env } from "../../libs/env";

const apiFeedHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const redis = getRedisClient();

    if (String(req.method).toUpperCase() === "GET") {
        try {
            const lastId = String(req.query.last_id || "-");

            console.log("env", env);
            console.log("lastId", lastId);

            const data = await redis.xrange(
                env.FEED_REDIS_KEY,
                lastId,
                "+",
                "COUNT",
                env.FEED_MAX_ITEMS
            );

            const recordSet: Array<Record<string, unknown>> = [];
            data.filter(([id]) => id !== lastId).forEach(([id, record]) => {
                const [key, value] = record;
                recordSet.push({ id, ...JSON.parse(value) });
            });

            res.status(200).json(recordSet.reverse());
        } catch (error) {
            res.status(400).json({ error: error });
        }
    } else if (String(req.method).toUpperCase() === "POST") {
        try {
            const data = await redis.xadd(
                env.FEED_REDIS_KEY,
                // Set the Max Length of the Feed
                "MAXLEN",
                env.FEED_MAX_LENGTH,
                "*", // Generate an ID
                // Set a Key Pair
                env.FEED_KEY_NAME,
                JSON.stringify(req.body)
            );

            res.status(201).json(data);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    } else {
        res.status(404).json({ error: "not found" });
    }

    redis.disconnect();
};

export default apiFeedHandler;
