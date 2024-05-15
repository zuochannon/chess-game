import express from "express";
import {
  updateAnnotation,
  getAnnotations,
} from "../database/models/cassandra/game_annotations/annotations.mjs";

const router = express.Router();

const createTuple = (turn, pgn) => `(${turn},'${pgn}')`;

router.get("/getAnnotations", async (req, res) => {
  const { gameid } = req.query;

  try {
    res.json({ annotations: await getAnnotations(gameid, req.user.userID) });
  } catch (error) {
    console.error("Error executing Cassandra query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


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
