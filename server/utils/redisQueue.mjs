import { redisClient } from "../database/connection.mjs";
import { GameInfo } from "../models/GameInfo.mjs";

const queue = "queue"

export const enqueue = async (user) => {
  await redisClient.sadd(queue, user);
};

export const length = async () => {
    return await redisClient.scard(queue);
  };

export const remove = async (user) => {
  await redisClient.srem(user);
};

export const get = async () => {
    return await redisClient.smembers(queue);
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