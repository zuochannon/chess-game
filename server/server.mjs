import { client } from "./database/connection.mjs";
import { types } from "cassandra-driver";
import ENV from "./EnvVars.mjs";
import express from "express";
import cors from "cors";
import { initDB } from "./database/initDB.mjs";
import constants from "./database/constants.mjs";
import bcrypt from "bcrypt";

const app = express();
app.use(cors());
app.use(express.json());

initDB();

app.listen(ENV.PORT, () => {
  console.log(`Server running on port ${ENV.PORT}`);
});

// REMOVE ON PROD
app.get("/users", async (req, res) => {
  try {
    const query = `SELECT * FROM ${constants.KEYSPACE}.Users`;
    const result = await client.execute(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing Cassandra query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const query = `SELECT password FROM ${constants.KEYSPACE}.Users WHERE username='${username}' ALLOW FILTERING;`;
    const result = await client.execute(query);

    if (!result.rows.length)
      return res.status(401).json({ error: "User not found, please sign up." });

    const passwordMatch = await bcrypt.compare(
      password,
      result.rows[0].password
    );

    if (passwordMatch) res.json({ message: "Login successful" });
    else res.status(401).json({ error: "Incorrect password." });
  } catch (error) {
    console.error("Error executing Cassandra query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const saltRounds = 10;

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const result = await client.execute(
      `SELECT username FROM ${constants.KEYSPACE}.Users WHERE username='${username}' AND email='${email}' ALLOW FILTERING;`
    );

    if (result.rows.length)
      return res.status(400).json({ error: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await client.execute(`INSERT INTO Users (userID, username, email, password) VALUES
    (uuid(), '${username}', '${email}', '${hashedPassword}');`);
    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
