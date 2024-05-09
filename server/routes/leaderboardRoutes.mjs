import express from "express";
import { getAllElo } from "../database/models/cassandra/users/userInfo.mjs";

const router = express.Router();

router.get("/getAll", async (req, res) => {
    try {
        res.json({ users: await getAllElo() });
      } catch (error) {
        console.error("Error executing Cassandra query:", error);
        res.status(500).json({ error: "Internal server error" });
      }
})

export default router;