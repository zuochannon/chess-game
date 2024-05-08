// server/routes/onlinePlay.mjs
import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.mjs";
import { nanoid } from "nanoid";
import { getAll, getGameInfo, has, setGameInfo } from "../utils/redisRooms.mjs";
import { GameInfo } from "../models/GameInfo.mjs";

const router = express.Router();

router.get("/createRoom", verifyToken, async (req, res) => {
  let roomid = nanoid(10); 
  await setGameInfo(roomid, new GameInfo(req.ip));
  res.json({ roomid: roomid });
  console.log("created room: " + roomid);
});

router.get("/:roomid/joinRoom", async (req, res) => {
  let roomid = req.params.roomid;
  console.log(await getAll());
  console.log("Trying to join room: " + roomid + " |" + await has(roomid));
  if (await has(roomid)) {
    const gameInfo = await getGameInfo(roomid);

    if (gameInfo.blackIP === -1 && gameInfo.whiteIP !== req.ip) {
      gameInfo.blackIP = req.ip;
      await setGameInfo(roomid, gameInfo); 
    }
    if (gameInfo.blackIP === req.ip || gameInfo.whiteIP === req.ip) {
      res.json({moves: gameInfo.moves, gameInfo: gameInfo}); // Send entire gameInfo
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
  let roomid = req.params.roomid;
  if (await has(roomid)) {
    let moveHistory = await getGameInfo(roomid);
    moveHistory.moves.push(req.body.move);
    await setGameInfo(roomid, moveHistory);  
    res.status(200).send();
  } else {
    res.status(404).send("Room ID not found");
  }
});

export default router;
