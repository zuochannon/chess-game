import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.mjs";

class GameInfo {
  constructor(whiteIP) {
    this.whiteIP = whiteIP;
    this.blackIP = -1;
    this.moves = [];
    this.lastMove = new Date(); 
    this.canJoin = () => !(this.whiteIP && this.blackIP) // if set both to null as default, so users can join
    // players with maxiumum of 2, every new other player is just spectator (cant move)
  }
}
const router = express.Router();
const gameMap = new Map(); // Tracks all the running games with room id. Can be replaced with DB later
                           // RoomID:[white player IP, black player  IP, List of moves]

router.get("/createRoom", verifyToken, async (req, res) => {
  let roomid = Math.floor(Math.random() * 1_000_000) // random room id; maybe use UUID
  gameMap.set(roomid, new GameInfo(req.ip)) // setting creator to white
  res.json({roomid: roomid})
  console.log("created room: " + roomid)
})

router.get("/:roomid/joinRoom", async (req, res) => {
  let roomid = parseInt(req.params.roomid)
  console.log(gameMap)
  console.log("Trying to join room: " + roomid + " " + gameMap.has(roomid))
  if (gameMap.has(roomid)) {
    let gameInfo = gameMap.get(roomid)

    if (gameInfo.blackIP == -1 && gameInfo.whiteIP != req.ip) {
      // Person creating room sent game invite and got a response
      gameInfo.blackIP = req.ip
    }
    if (gameInfo.blackIP == req.ip || gameInfo.whiteIP == req.ip) {
      // Only let people join the room if they were in the game
      res.json(gameInfo.moves) 
    }
    else {
      res.status(401).send("Room is Full")
    }
  } else {
    res.status(404).send("Unauthorized room")
  }
})
router.get("/:roomid/getMoves", async (req, res) => {
  let roomid = req.params.roomid;
  if (gameMap.has(roomid)) {
    res.json(gameMap.get(roomid));
  }
  else {
    res.status(404).send("Room ID not found");
  }
});

router.post("/:roomid/makeMove", async (req, res) => {
  // TODO: ADD TIMECHECK WHERE AFTER 30 MINUTES SINCE ROOM CREATION, PURGE IT FROM GAMEMAP
  let roomid = req.params.roomid;
  if (gameMap.has(roomid)) {
    let moveHistory = gameMap.get(roomid);
    moveHistory.push(req.body.move)
    res.end(200)
  } 
  else {
    res.status(404).send("Room ID not found")
  }
});

export default router;
