import CONFIG from "./dbConfig.mjs";
import cassandra from "cassandra-driver";
import pg from "pg";
import constants from "./constants.mjs";
import Redis from "ioredis";

const { Pool } = pg;

export const cassandraClient = new cassandra.Client({
  contactPoints: CONFIG.CONTACT_POINTS,
  localDataCenter: CONFIG.DATA_CENTER,
});

export const pool = new Pool({
  connectionString: constants.POSTGRES_URL,
});

export const redisClient = new Redis({
  host: constants.REDIS_HOST, 
  port: constants.REDIS_PORT,
});