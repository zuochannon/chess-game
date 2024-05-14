import express from "express";
import { cassandraClient } from "../database/connection.mjs";
import constants from "../database/constants.mjs";
import { getGames, updateComment } from "../database/models/cassandra/game/gameHistory.mjs";
import { getReplay, insertReplay } from "../database/models/cassandra/game_replay/replay.mjs";

const router = express.Router();

router.post("/archiveGame", async (req, res) => {
    const { state } = req.body;

    const winningTeam = state[state.length - 1].winningTeam;
  try {
    res.json(await insertReplay(state, winningTeam));
  } catch (error) {
    console.error("Error executing Cassandra query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getReplay", async (req, res) => {
    const { gameid } = req.query;

    try {
        res.json(await getReplay(gameid));
      } catch (error) {
        console.error("Error executing Cassandra query:", error);
        res.status(500).json({ error: "Internal server error" });
      }
});

export default router;
