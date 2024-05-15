import express from "express";
import { cassandraClient } from "../database/connection.mjs";
import constants from "../database/constants.mjs";
import {
  getGames,
  updateComment,
} from "../database/models/cassandra/game/gameHistory.mjs";
import {
  getReplay,
  insertReplay,
} from "../database/models/cassandra/game_replay/replay.mjs";
import {
  updateAnnotation,
  getAnnotations,
} from "../database/models/cassandra/game_annotations/annotations.mjs";
import { types } from "cassandra-driver";

const router = express.Router();

// router.post("/archiveGame", async (req, res) => {
//   const { state, pgn } = req.body;

//   const pieces = state.map((el) => el.pieces);

//   const totalTurns = state[state.length - 1].totalTurns;

//   const winningTeam = state[state.length - 1].winningTeam;

//   try {
//     res.json(await insertReplay(pieces, totalTurns, winningTeam, pgn));
//   } catch (error) {
//     console.error("Error executing Cassandra query:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

router.get("/getAnnotations", async (req, res) => {
  const { gameid } = req.query;

  try {
    res.json({ annotations: await getAnnotations(gameid, req.user.userID) });
  } catch (error) {
    console.error("Error executing Cassandra query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const createTuple = (turn, pgn) => `(${turn},'${pgn}')`;

router.post("/addAnnotation", async (req, res) => {
  const { gameID, turn, pgn, annotation } = req.body;

  try {
    const moveTuple = createTuple(turn, pgn);
    await updateAnnotation(gameID, req.user.userID, moveTuple, annotation);
  } catch (error) {
    console.error("Error executing Cassandra query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
