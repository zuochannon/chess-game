import express from "express";
import { v4 as uuidv4 } from "uuid";
import {
  getGames,
  insertGameHistory,
  updateComment,
} from "../database/models/cassandra/game/gameHistory.mjs";
import { getUser } from "../database/models/users.mjs";

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

/*
gameID,
  players,
  playerNames,
  winnerID,
  loserID,
  timestamp,
  turns,
  game_type
  */

router.post("/addOfflineGame", async (req, res) => {
  const gameID = uuidv4();

  const { winningteam, turns, game_type } = req.body;

  const myID = req.user.userID;

  const players = [myID];
  const playerNames = [req.user.username];

  let winnerID = null;
  let loserID = null;
  let result = "illegal";

  switch (winningteam) {
    case "w":
      winnerID = myID;
      result = "win";
      break;

    case "l":
      loserID = myID;
      result = "lose";
      break;

    case "d":
      result = "draw";
      break;
  }

  try {
    res.json(
      await insertGameHistory(
        gameID,
        players,
        playerNames,
        result,
        winnerID,
        loserID,
        Date.now(),
        turns,
        game_type
      )
    );
  } catch (error) {
    console.error("Error executing Cassandra query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/addGame", async (req, res) => {
  const gameID = uuidv4();

  const { opponentName, result, turns, game_type } = req.body;

  const myID = req.user.userID;
  const opponentID = (await getUser(opponentName)).rows[0].userid;

  const players = opponentName ? [myID, opponentID] : [myID];
  const playerNames = opponentName
    ? [req.user.username, opponentName]
    : [req.user.username];

  let winnerID = null;
  let loserID = null;

  switch (result) {
    case "w":
      winnerID = myID;
      loserID = opponentID;
      break;

    case "l":
      winnerID = opponentID;
      loserID = myID;
      break;
  }

  try {
    res.json(
      await insertGameHistory(
        gameID,
        players,
        playerNames,
        winnerID,
        loserID,
        Date.now(),
        turns,
        game_type
      )
    );
  } catch (error) {
    console.error("Error executing Cassandra query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
