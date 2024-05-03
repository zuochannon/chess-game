import { cassandraClient } from "./connection.mjs";
import constants from "./constants.mjs";
import CONSTANTS from "./constants.mjs";
import initData from "./initData.mjs";
import createUserInfo from "./models/cassandra/users/users.mjs";
import createUserTable from "./models/postgres/users/userAuth.mjs";
import pg from "postgres";

const createKeyspace = async () => {
  const query = `CREATE KEYSPACE IF NOT EXISTS ${CONSTANTS.KEYSPACE} WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };`;
  await cassandraClient.execute(query);
  cassandraClient.execute(`USE ${CONSTANTS.KEYSPACE};`);
  console.log("keyspace created");
};

const createColumnFamilies = async () => {
  await Promise.all([createUserInfo()]);
};

const createDatabase = async () => {
  const sql = pg(constants.POSTGRES_URL);
  try {
    await sql`SELECT EXISTS (
      SELECT datname FROM pg_catalog.pg_database WHERE datname = ${sql.options.database}
      )`;
  } catch (e) {
    if (e.code === "3D000") {
      await pg(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        `postgres://${sql.options.user}:${sql.options.pass}@${sql.options.host[0]}:${sql.options.port[0]}/postgres`
      ).unsafe(`CREATE DATABASE ${sql.options.database}`);
    }
  }
  return sql;
};

const createTables = async (sql) => {
  await createUserTable(sql);
};

const initCassandra = async () => {
  await createKeyspace();
  await createColumnFamilies();
};

const initPostgres = async () => {
  const sql = await createDatabase();
  await createTables(sql);
};

export async function initDB() {
  await Promise.all([initCassandra(), initPostgres()]);

  initData();
}
