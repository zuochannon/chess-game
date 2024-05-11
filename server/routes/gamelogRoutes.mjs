import express from "express";
import { cassandraClient } from "../database/connection.mjs";
import constants from "../database/constants.mjs";
import { getGames, updateComment } from "../database/models/cassandra/game/gameHistory.mjs";

const router = express.Router();

router.get("/summary", async (req, res) => {
  try {
    res.json(await getGames(req.user.userID));
  } catch (error) {
    console.error("Error executing Cassandra query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/updateComment", async (req, res) => {
  const { gameID, comment } = req.body;
  try {
    res.json(await updateComment(gameID, comment));
  } catch (error) {
    console.error("Error executing Cassandra query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
