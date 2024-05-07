import express from "express";
import { getAvatarURL } from "../database/models/cassandra/users/userInfo.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
  if (req.user) {
    const { username, email } = req.user;
    const avatarURL = await getAvatarURL(req.user.userID) ?? "";
    res.json({ user: { username, email, avatarURL } });
  } else {
    res.status(401).json({ error: "Not logged in." });
  }
});

export default router;
