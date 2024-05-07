import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.mjs";
import { nanoid } from "nanoid";
import { redisClient } from "../database/connection.mjs";

class GameInfo {
  constructor(whiteIP) {
    this.whiteIP = whiteIP;
    this.blackIP = -1;
    this.moves = [];
    this.lastMove = new Date();
    this.canJoin = () => !(this.whiteIP && this.blackIP); // if set both to null as default, so users can join
    // players with maxiumum of 2, every new other player is just spectator (cant move)
  }

  // Function to convert GameInfo object to a Redis hash
  toRedisHash() {
    return {
      whiteIP: this.whiteIP,
      blackIP: this.blackIP,
      moves: JSON.stringify(this.moves),
      lastMove: this.lastMove.toISOString(), // Store date as string
    };
  }

  // Function to load GameInfo object from a Redis hash
  static fromRedisHash(hash) {
    const gameInfo = new GameInfo(hash.whiteIP);
    gameInfo.blackIP = hash.blackIP;
    gameInfo.moves = JSON.parse(hash.moves);
    gameInfo.lastMove = new Date(hash.lastMove);
    return gameInfo;
  }
}

const router = express.Router();
// const gameMap = new Map(); // Tracks all the running games with room id. Can be replaced with DB later
// RoomID:[white player IP, black player  IP, List of moves]

router.get("/createRoom", verifyToken, async (req, res) => {
  // need to be logged in in order to create a room
  let roomid = nanoid(10); // check out stats from this site https://zelark.github.io/nano-id-cc/
  await redisClient.hmset(roomid, new GameInfo(req.ip).toRedisHash()); // setting creator to white
  res.json({ roomid: roomid });
  console.log("created room: " + roomid);
});

router.get("/:roomid/joinRoom", async (req, res) => {
  // does not need to be logged in in order to join a room
  let roomid = req.params.roomid;
  console.log(await redisClient.keys('*'));
  console.log("Trying to join room: " + roomid + " |" + await redisClient.exists(roomid));
  if (await redisClient.exists(roomid)) {
    let gameInfo = GameInfo.fromRedisHash(await redisClient.hgetall(roomid));

    if (gameInfo.blackIP == -1 && gameInfo.whiteIP != req.ip) {
      // Person creating room sent game invite and got a response
      gameInfo.blackIP = req.ip;
    }
    if (gameInfo.blackIP == req.ip || gameInfo.whiteIP == req.ip) {
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
  if (await redisClient.exists(roomid)) {
    res.json(GameInfo.fromRedisHash(await redisClient.hgetall(roomid)));
  } else {
    res.status(404).send("Room ID not found");
  }
});

router.post("/:roomid/makeMove", async (req, res) => {
  // TODO: ADD TIMECHECK WHERE AFTER 30 MINUTES SINCE ROOM CREATION, PURGE IT FROM GAMEMAP
  let roomid = req.params.roomid;
  if (await redisClient.exists(roomid)) {
    let moveHistory = GameInfo.fromRedisHash(await redisClient.hgetall(roomid));
    moveHistory.push(req.body.move);
    res.end(200);
  } else {
    res.status(404).send("Room ID not found");
  }
});

export default router;
