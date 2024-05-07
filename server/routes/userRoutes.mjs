import express from "express";
import { cassandraClient } from "../database/connection.mjs";
import constants from "../database/constants.mjs";
import { getUser } from "../database/models/users.mjs";

const router = express.Router();

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

router.get("/getUser", async (req, res) => {
  const { username } = req.query;

  console.log(req.cookies.token);

  try {
    const result = await getUser(username);

    const userData = result.rows[0];

    if (userData) {
      const { username, email } = userData;
      res.status(200).json({ username, email });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.put("/updateAvatar", async (req, res) => {
  const { url } = req.body;

  try {
    const query = `UPDATE ${constants.KEYSPACE}.Users SET avatarurl = ? WHERE userid = ?;`;
    await cassandraClient.execute(query, [url, req.user.userID], {
      prepare: true,
    })
  } catch (error) {
    console.error("Error executing Cassandra query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


export default router;
