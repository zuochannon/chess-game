import express from "express";
import bcrypt from "bcryptjs";
import { pool } from "../database/connection.mjs";
import jwt from "jsonwebtoken";
import { insertUser } from "../database/models/users.mjs";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const query = `SELECT username, email, password FROM Users WHERE username=$1;`;
    const result = await pool.query(query, [username]);

    if (!result.rows.length)
      return res.status(401).json({ error: "User not found, please sign up." });

    if (await bcrypt.compare(password, result.rows[0].password)) {
      const token = await jwt.sign(
        { username: result.rows[0].username, email: result.rows[0].email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      

      res.cookie('token', token, {
        maxAge: 36000000,
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      }).json({message: "Login successful"});

    } else res.status(401).json({ error: "Incorrect password." });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const result = await pool.query(
      `SELECT userID FROM Users WHERE username=$1;`,
      [username]
    );

    if (result.rows.length)
      return res.status(400).json({ error: "User already exists." });

    const uuid = await insertUser(username, email, password);

    res.json({
      message: "User registered successfully",
      token: jwt.sign({ userID: uuid }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      }),
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
