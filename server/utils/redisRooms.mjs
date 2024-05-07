import { redisClient } from "../database/connection.mjs";
import { GameInfo } from "../models/GameInfo.mjs";

export const setGameInfo = async (roomID, game) => {
  await redisClient.hmset(roomID, game.toRedisHash());
};

export const has = async (roomID) => {
  return await redisClient.exists(roomID);
};

export const getGameInfo = async (roomID) => {
    return GameInfo.fromRedisHash(await redisClient.hgetall(roomID));
}

export const getAll = async () => {
    // Get all keys matching a pattern (e.g., all keys)
    return await redisClient.keys('*');

    // // Iterate over keys and fetch their values
    // for (const key of keys) {
    //   const value = await getGameInfo(key);
    //   console.log(`Key: ${key}, Value: ${value}`);
    // }
}