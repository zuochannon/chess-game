import { pool } from "../../../connection.mjs";

const createUserTable = async () => {
  const query = `CREATE TABLE IF NOT EXISTS Users (
    userID UUID PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT,
    password TEXT
    CONSTRAINT username_min_len CHECK (LENGTH(username) >= 3)
);`;
  await pool.query(query);

  await pool.query(`CREATE INDEX IF NOT EXISTS idx_username ON Users (username);`);
  console.log("created postgres user table");
};

export default createUserTable;
