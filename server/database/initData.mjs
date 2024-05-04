import { insertUser } from "./models/users.mjs";

const initUsers = async () => {
  await Promise.all([
    insertUser(
      "john_doe",
      "john@example.com",
      "password123"
    ),
    insertUser(
      "jane_doe",
      "jane@example.com",
      "jane"
    ),
    insertUser(
      "bob_smith",
      "bob@example.com",
      "bob"
    ),
    insertUser(
      "alice_wonderland",
      "alice@example.com",
      "alice"
    ),
    insertUser(
      "charlie_brown",
      "charlie@example.com",
      "charlie"
    ),
  ]);
};

const initCassandraData = async () => {
//   Promise.all([initUserData()]);
};

const initPostgresData = async (sql) => {
//   Promise.all([initUserAuthData(sql)]);
};

const initData = async (sql) => {
  console.log("inserting data");
  Promise.all([
    initUsers()
  ]);
//   Promise.all([initCassandraData(), initPostgresData(sql)]);
};

export default initData;
