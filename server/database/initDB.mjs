import { cassandraClient, pool } from "./connection.mjs";
import constants from "./constants.mjs";
import CONSTANTS from "./constants.mjs";
import initData from "./initData.mjs";
import createUserInfo from "./models/cassandra/users/users.mjs";
import createUserTable from "./models/postgres/users/userAuth.mjs";

const createKeyspace = async () => {
  const query = `CREATE KEYSPACE IF NOT EXISTS ${CONSTANTS.KEYSPACE} WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };`;
  await cassandraClient.execute(query);
  cassandraClient.execute(`USE ${CONSTANTS.KEYSPACE};`);
  console.log("keyspace created");
};

const createDatabase = async () => {
  const result = await pool.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = $1;`, [constants.POSTGRES_DB]);

  if (result.rowCount === 0) 
    await pool.query(`CREATE DATABASE ${constants.POSTGRES_DB}`);
};

const createColumnFamilies = async () => {
  await Promise.all([createUserInfo()]);
};

const createTables = async () => {
  await createUserTable(pool);
};

const initCassandra = async () => {
  await createKeyspace();
  await createColumnFamilies();
};

const initPostgres = async () => {
  await createDatabase();
  await createTables(pool);
};

export async function initDB() {
  await Promise.all([initCassandra(), initPostgres()]);

  initData();
}
