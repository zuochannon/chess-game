import { redisClient } from "../database/connection.mjs";
import { GameInfo } from "../models/GameInfo.mjs";

const queue = "queue"

export const enqueue = async (user) => {
  await redisClient.rpush(queue, user);
};

export const length = async () => {
    return await redisClient.llen(queue);
  };

export const dequeue = async () => {
    return await redisClient.lpop(queue);
}

export const remove = async (user) => {
  await redisClient.lrem(queue, 0, user);
};

export const get = async () => {
    return await redisClient.lrange(queue, 0, -1);
}

export const del = async () => {
    await redisClient.del(queue);
}

// export const getGameInfo = async (roomID) => {
//     return GameInfo.fromRedisHash(await redisClient.hgetall(roomID));
// }

// export const getAll = async () => {
    // Get all keys matching a pattern (e.g., all keys)
    // return await redisClient.keys('*');

    // // Iterate over keys and fetch their values
    // for (const key of keys) {
    //   const value = await getGameInfo(key);
    //   console.log(`Key: ${key}, Value: ${value}`);
    // }
// }