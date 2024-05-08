import express from "express";
import { getAll, getGameInfo, has, setGameInfo } from "../utils/redisRooms.mjs";
import { GameInfo } from "../models/GameInfo.mjs";
import { enqueue, get } from "../utils/redisQueue.mjs";
import { verifyToken } from "../middlewares/authMiddleware.mjs";
import { nanoid } from "nanoid";
import { User } from "../models/User.mjs";
import { getUser, setUser } from "../utils/redisUser.mjs";

const router = express.Router();
// const gameMap = new Map(); // Tracks all the running games with room id. Can be replaced with DB later
// RoomID:[white player IP, black player  IP, List of moves]

let i = 0;

const getPlayers = async () =>
  await Promise.all((await get()).map(async (key) => await getUser(key)));

router.post("/queue", async (req, res) => {
  const name = req.ip + `::${nanoid(5)}`;
  const user = new User(name, 1000 + Math.random() * 500);
  // console.log(user);
  await enqueue(name);
  await setUser(name, user);
  console.log("added ", name);
});

router.post("/match", async (req, res) => {
  console.log("players", await getPlayers());
});





















router.get("/createRoom", verifyToken, async (req, res) => {
  // need to be logged in in order to create a room
  let roomid = nanoid(10); // check out stats from this site https://zelark.github.io/nano-id-cc/
  await setGameInfo(roomid, new GameInfo(req.ip));
  res.json({ roomid: roomid });
  console.log("created room: " + roomid);
});

router.get("/:roomid/joinRoom", async (req, res) => {
  // does not need to be logged in in order to join a room
  let roomid = req.params.roomid;
  console.log(await getAll());
  console.log("Trying to join room: " + roomid + " |" + (await has(roomid)));
  if (await has(roomid)) {
    const gameInfo = await getGameInfo(roomid);

    if (gameInfo.blackIP === -1 && gameInfo.whiteIP !== req.ip) {
      // Person creating room sent game invite and got a response
      gameInfo.blackIP = req.ip;
    }
    if (gameInfo.blackIP === req.ip || gameInfo.whiteIP === req.ip) {
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
