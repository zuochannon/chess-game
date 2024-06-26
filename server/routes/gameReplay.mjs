import express from "express";
import {
  getReplay,
  insertReplay,
} from "../database/models/cassandra/game_replay/replay.mjs";

const router = express.Router();

router.post("/archiveGame", async (req, res) => {
  const { gameID, state, pgn } = req.body;

  const pieces = state.map((el) => el.pieces);

  const totalTurns = state[state.length - 1].totalTurns;

  const winningTeam = state[state.length - 1].winningTeam;

  try {
    res.json(await insertReplay(gameID, pieces, totalTurns, winningTeam, pgn));
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
