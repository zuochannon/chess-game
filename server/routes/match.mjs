import express from "express";
import { nanoid } from "nanoid";
import { verifyToken } from "../middlewares/authMiddleware.mjs";
import { GameInfo } from "../models/GameInfo.mjs";
import { User } from "../models/User.mjs";
import Constants from "../utils/constants/Constants.mjs";
import { dequeue, enqueue, get, length, remove } from "../utils/redisQueue.mjs";
import { getAll, getGameInfo, has, setGameInfo } from "../utils/redisRooms.mjs";
import { delUser, getUser, setUser } from "../utils/redisUser.mjs";

const router = express.Router();
// const gameMap = new Map(); // Tracks all the running games with room id. Can be replaced with DB later
// RoomID:[white player IP, black player  IP, List of moves]

const getPlayers = async () =>
  await Promise.all((await get()).map(async (key) => await getUser(key)));

  // Matching based on elo
const calculateDiff = (player1, player2) => Math.abs(player1.elo - player2.elo);

const match = async (currentPlayer) => {
  const players = await getPlayers();
  if (!players || players.length === 0) return;

  let nextClosest = { user: null, eloDiff: Number.MAX_SAFE_INTEGER };

  for (const current of players) {
    const eloDiff = calculateDiff(current, currentPlayer);
    if (eloDiff < Constants.EloThreshold) {
      nextClosest.user = current;
      break;
    }

    if (eloDiff < nextClosest.eloDiff) {
      nextClosest.user = current;
      nextClosest.eloDiff = eloDiff;
    }
  }
  await remove(nextClosest.user.IP);
  return nextClosest.user;
};

const queueNext = async () => {
    return (await length() > 1) ? await dequeue() : null;
}

router.get("/queue_length", async (req, res) => {
  try {
    res.json({ len: await length() });
  } catch (err) {
    console.log(err);
  }
});

router.post("/queue", verifyToken, async (req, res) => {
  const name = req.user.userID;
  const user = new User(name, 1000 + Math.random() * 500);

  await enqueue(name);
  await setUser(name, user);

});

const matches = {};

router.post("/match", async (req, res) => {
  console.log("players", await getPlayers());
  console.log("queue", await get());
  let currentPlayerKey = await queueNext();


  while (currentPlayerKey) {
    const currentPlayer = await getUser(currentPlayerKey);
    
    const matchedPlayer = await match(currentPlayer);
    matches[currentPlayer.IP] = matchedPlayer;
    matches[matchedPlayer.IP] = currentPlayer;
    
    currentPlayerKey = await queueNext();
  }
  console.log("players still in the queue", await getPlayers());

  console.log("MATCHES", matches)
});

router.get("/getMatches", verifyToken, async (req, res) => {
  res.json({ match: matches[req.user.userID] });
})





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
