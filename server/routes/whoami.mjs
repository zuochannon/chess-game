import express from "express";
import { getAvatarURL, getUserElo } from "../database/models/cassandra/users/userInfo.mjs";
import constants from "../utils/constants/Constants.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
  if (req.user) {
    const { username, email } = req.user;
    const avatarURL = await getAvatarURL(req.user.userID) ?? "";
    const elo = await getUserElo(req.user.userID) ?? constants.EloDefault;
    res.json({ user: { username, email, avatarURL, elo } });
  } else {
    res.status(401).json({ error: "Not logged in." });
  }
});

export default router;
