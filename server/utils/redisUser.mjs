import { redisClient } from "../database/connection.mjs";
import { GameInfo } from "../models/GameInfo.mjs";
import { User } from "../models/User.mjs";

export const setUser = async (user, userInfo) => {
  await redisClient.hmset(user, userInfo.toRedisHash());
};

export const has = async (user) => {
  return await redisClient.exists(user);
};

export const getUser = async (user) => {
    return User.fromRedisHash(await redisClient.hgetall(user));
}

export const delUser = async (user) => {
    return await redisClient.del(user);
}