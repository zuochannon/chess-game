import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  if (req.user) {
    const { username, email } = req.user;
    res.json({ user: { username, email } });
  } else {
    res.status(401).json({ error: "Not logged in." });
  }
});

export default router;
