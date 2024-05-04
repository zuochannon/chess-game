import { cassandraClient, sql } from "./connection.mjs";
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

const createColumnFamilies = async () => {
  await Promise.all([createUserInfo()]);
};

const createTables = async () => {
  await createUserTable(sql);
};

const initCassandra = async () => {
  await createKeyspace();
  await createColumnFamilies();
};

const initPostgres = async () => {
  await createTables(sql);
};

export async function initDB() {
  await Promise.all([initCassandra(), initPostgres()]);

  initData();
}
