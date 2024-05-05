import express from "express";
import { cassandraClient } from "../database/connection.mjs";
import constants from "../database/constants.mjs";

const router = express.Router();

router.get("/summary", async (req, res) => {
  try {
    const query = `SELECT gameid, timestamp, game_type, loserid, players, result, turns, winnerid FROM ${constants.KEYSPACE}.GameHistory WHERE players CONTAINS ? ALLOW FILTERING;`;
    const result = await cassandraClient.execute(query, [req.user.userID], {
      prepare: true,
    });
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing Cassandra query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
