import express from "express";
import bcrypt from "bcryptjs";
import { cassandraClient } from "../database/connection.mjs";
import constants from "../database/constants.mjs";
import jwt from "jsonwebtoken"


const router = express.Router();
const saltRounds = 10;

router.get("/users", async (req, res) => {
  try {
    const query = `SELECT * FROM ${constants.KEYSPACE}.Users`;
    const result = await cassandraClient.execute(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing Cassandra query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const query = `SELECT userID, password FROM ${constants.KEYSPACE}.Users WHERE username='${username}' ALLOW FILTERING;`;
    const result = await cassandraClient.execute(query);

    if (!result.rows.length)
      return res.status(401).json({ error: "User not found, please sign up." });

    if (await bcrypt.compare(password, result.rows[0].password))
      res.json({ message: "Login successful", token: jwt.sign({ userID: result.rows[0].userID }, 'temporarytest', { expiresIn: '1h' }) });
    else res.status(401).json({ error: "Incorrect password." });
  } catch (error) {
    console.error("Error executing Cassandra query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const result = await cassandraClient.execute(
      `SELECT username FROM ${constants.KEYSPACE}.Users WHERE username='${username}' AND email='${email}' ALLOW FILTERING;`
    );

    if (result.rows.length)
      return res.status(400).json({ error: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await cassandraClient.execute(`INSERT INTO Users (userID, username, email, password) VALUES
      (uuid(), '${username}', '${email}', '${hashedPassword}');`);
    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
