import express from "express";
import { nanoid } from "nanoid";
import { verifyToken } from "../middlewares/authMiddleware.mjs";
import { GameInfo } from "../models/GameInfo.mjs";
import { getAll, getGameInfo, has, setGameInfo } from "../utils/redisRooms.mjs";

const router = express.Router();
// const gameMap = new Map(); // Tracks all the running games with room id. Can be replaced with DB later
// RoomID:[white player IP, black player  IP, List of moves]

router.post("/createRoom", verifyToken, async (req, res) => {
  // need to be logged in in order to create a room
  let roomid = nanoid(10); // check out stats from this site https://zelark.github.io/nano-id-cc/
  let user = req.user.userID;
  await setGameInfo(roomid, new GameInfo(user)); // sets WhiteUserID
  res.json({ roomid: roomid });
});

router.post("/:roomid/joinRoom", verifyToken, async (req, res) => {
  let roomid = req.params.roomid;
  console.log("Trying to join room: " + roomid);
  let user = req.user.userID;
  console.log(user)

  console.log(await getAll());
  if (await has(roomid)) {
    const gameInfo = await getGameInfo(roomid);
    console.log(gameInfo);
    if (gameInfo.blackUserID === "-1" && gameInfo.whiteUserID !== user) {
      // Person creating room sent game invite and got a response
      gameInfo.blackUserID = user; // sets BlackUserID
      await setGameInfo(roomid, gameInfo);
    }
    if (gameInfo.blackUserID === user || gameInfo.whiteUserID === user) {
      // Only let people join the room if they were in the game
      res.json({ ...gameInfo, color: gameInfo.whiteUserID === user ? "w" : "b" });
    } else {
      res.status(401).send("Room is Full");
    }
  } else {
    res.status(404).send("Unauthorized room");
  }
});

router.get("/:roomid/getMoves", async (req, res) => {
  // gets the move history
  let roomid = req.params.roomid;
  if (await has(roomid)) {
    res.json(await getGameInfo(roomid));
  } else {
    res.status(404).send("Room ID not found");
  }
});

router.post("/:roomid/makeMove", async (req, res) => {
  // TODO: ADD TIMECHECK WHERE AFTER 30 MINUTES SINCE ROOM CREATION, PURGE IT FROM GAMEMAP
  // updates the move history with the most recent move made
  let roomid = req.params.roomid;
  if (await has(roomid)) {
    let gameInfo = await getGameInfo(roomid);
    gameInfo.moves.push(req.body)
    gameInfo.lastMove = new Date();
    await setGameInfo(roomid, gameInfo);
    res.status(200);
  } else {
    res.status(404).send("Room ID not found");
  }
});

router.post("/:roomid/restartGame", async (req, res) => {
  console.log("Restarting Game")
  let roomid = req.params.roomid;
  if (await has(roomid)) {
    let gameInfo = await getGameInfo(roomid);
    gameInfo.moves = []
    await setGameInfo(roomid, gameInfo);
    res.status(200);
  } else {
    res.status(404).send("Room ID not found");
  }
});

export default router;