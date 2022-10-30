import { NextApiRequest, NextApiResponse } from "next";
import { getRedisClient } from "../../libs/redis";
import { env } from "../../libs/env";

const apiFeedHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const redis = getRedisClient();

    if (String(req.method).toUpperCase() === "GET") {
        try {
            // Get the Last ID from the Query String or Set to `-`
            const lastId = String(req.query?.last_id || "-");
            // Get the items from Redis
            const redisData = await redis.xrange(
                env.FEED_REDIS_KEY, // The Redis Key
                lastId, // The Last ID to Select From
                "+", // To the Latest Record
                "COUNT", // Pull Out a Max Number of Records
                env.FEED_MAX_ITEMS // The Max Number of Records to Pull
            );

            // Define the Record Set to the be Returned
            const recordSet: Array<Record<string, unknown>> = [];

            // Iterate over Redis Records, Remove the `lastId` record because its
            // returned by Redis
            redisData
                .filter(([id]) => id !== lastId)
                .forEach(([id, record]) => {
                    const [key, value] = record;
                    // Flatten the Redis Record Data and Add to Record Set
                    recordSet.push({ id, ...JSON.parse(value) });
                });

            // Respond with the RecordSet in Reverse Order (newest is first)
            res.status(200).json(recordSet.reverse());
        } catch (error) {
            // If and error occurred, return it
            res.status(400).json({ error: error });
        }
    } else if (String(req.method).toUpperCase() === "POST") {
        try {
            const data = await redis.xadd(
                env.FEED_REDIS_KEY,
                // Set the Max Length of the Feed, This will Drop any Records beyond
                // the max length starting from the Oldest
                "MAXLEN",
                env.FEED_MAX_LENGTH,
                "*", // Generate an ID
                // Set a Key Pair
                env.FEED_KEY_NAME,
                JSON.stringify(req.body) // Values must be String
            );

            // data is the ID of the record just inserted
            res.status(201).json(data);
        } catch (error) {
            // If and error occurred, return it
            res.status(400).json({ error: error });
        }
    } else {
        // Anything other than a `POST` or `GET` Request is 404
        res.status(404).json({ error: "not found" });
    }

    redis.disconnect();
};

export default apiFeedHandler;
