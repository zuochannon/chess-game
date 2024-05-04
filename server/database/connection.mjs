import CONFIG from "./dbConfig.mjs";
import cassandra from "cassandra-driver";
import pg from "postgres";
import constants from "./constants.mjs";

export const cassandraClient = new cassandra.Client({
  contactPoints: CONFIG.CONTACT_POINTS,
  localDataCenter: CONFIG.DATA_CENTER,
});

const postgresConnection = async () => {
  const testSQL = pg(constants.POSTGRES_URL);
  try {
    await testSQL`SELECT EXISTS (
        SELECT datname FROM pg_catalog.pg_database WHERE datname = ${testSQL.options.database}
        )`;
  } catch (e) {
    if (e.code === "3D000") {
      await pg(
        `postgres://${testSQL.options.user}:${testSQL.options.pass}@${testSQL.options.host[0]}:${testSQL.options.port[0]}/postgres`
      ).unsafe(`CREATE DATABASE ${testSQL.options.database}`);
    }
  }
  return testSQL;
};

export const sql = await postgresConnection();