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
  await setGameInfo(roomid, new GameInfo(user));
  res.json({ roomid: roomid });
  console.log("iN CREATE ROOM, created room: " + roomid);
});

router.post("/:roomid/joinRoom", verifyToken, async (req, res) => {
  // does not need to be logged in in order to join a room
  console.log('JOINING ROOM');
  console.log("Trying to join room: " + roomid);
  let roomid = req.params.roomid;
  let user = req.user.userID;
  console.log(await getAll());
  console.log("Trying to join room: " + roomid + " |" + await has(roomid));
  if (await has(roomid)) {
    const gameInfo = await getGameInfo(roomid);

    if (gameInfo.blackUserID === -1 && gameInfo.whiteUserID !== user) {
      // Person creating room sent game invite and got a response
      gameInfo.blackUserID = user;
    }
    if (gameInfo.blackUserID === user || gameInfo.whiteUserID === user) {
      // Only let people join the room if they were in the game
      res.json(gameInfo.moves);
    } else {
      res.status(401).send("Room is Full");
    }
  } else {
    res.status(404).send("Unauthorized room");
  }
});

router.get("/:roomid/getMoves", async (req, res) => {
  let roomid = req.params.roomid;
  if (await has(roomid)) {
    res.json(await getGameInfo(roomid));
  } else {
    res.status(404).send("Room ID not found");
  }
});

router.post("/:roomid/makeMove", async (req, res) => {
  // TODO: ADD TIMECHECK WHERE AFTER 30 MINUTES SINCE ROOM CREATION, PURGE IT FROM GAMEMAP
  let roomid = req.params.roomid;
  if (await has(roomid)) {
    let moveHistory = await getGameInfo(roomid);
    moveHistory.push(req.body.move);
    res.end(200);
  } else {
    res.status(404).send("Room ID not found");
  }
});

export default router;