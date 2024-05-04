import bcrypt from "bcryptjs";
import { cassandraClient, pool } from "../connection.mjs";
import constants from "../constants.mjs";

const saltRounds = 10;

export const insertUser = async (username, email, password) => {
    // we do not assume the caller has hashed the password; we assume the caller may have passed in plaintext

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userAuthResult = await pool.query(
      `INSERT INTO Users (userID, username, email, password) VALUES
      (uuid_generate_v4(), $1, $2, $3) ON CONFLICT (username) DO NOTHING RETURNING userID;`,
      [username, email, hashedPassword]
    );

    const uuid = userAuthResult.rows[0]?.userid;
    
    if (uuid) {
        const query = `INSERT INTO ${constants.KEYSPACE}.Users (userID, username, email) VALUES (?, ?, ?);`;
        await cassandraClient.execute(query, [uuid, username, email], { prepare: true });
    }

    return uuid;
}

export const getUser = async (username) => {
    const query = `SELECT username, email FROM ${constants.KEYSPACE}.Users WHERE username = ?;`;
    return await cassandraClient.execute(query, [username], { prepare: true });
}