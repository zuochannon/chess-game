import { sql } from "../../../connection.mjs";

const createUserTable = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS Users (
        userID SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        email TEXT,
        password TEXT
        CONSTRAINT username_min_len CHECK (LENGTH(username) >= 3)
    );
  `;

  await sql`CREATE INDEX IF NOT EXISTS idx_username ON Users (username);`;
  console.log("created postgres user table");
};

export default createUserTable;
