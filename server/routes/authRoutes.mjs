import express from "express";
import bcrypt from "bcryptjs";
import { pool } from "../database/connection.mjs";
import jwt from "jsonwebtoken";
import { insertUser } from "../database/models/users.mjs";

const router = express.Router();

const signToken = (uuid, username, email) =>
  jwt.sign(
    { userID: uuid, username: username, email: email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const query = `SELECT userID, username, email, password FROM Users WHERE username=$1;`;
    const result = await pool.query(query, [username]);

    if (!result.rows.length)
      return res.status(401).json({ error: "User not found, please sign up." });

    if (await bcrypt.compare(password, result.rows[0].password)) {
      const token = signToken(
        result.rows[0].userid,
        result.rows[0].username,
        result.rows[0].email
      );

      res
        .cookie("token", token, {
          maxAge: 36000000,
          httpOnly: true,
          secure: true,
          sameSite: "None",
        })
        .json({ message: "Login successful" });
    } else res.status(401).json({ error: "Incorrect password." });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/logout", async (req, res) => {
  res.clearCookie("token");
  res.status(200).json("User Logged out");
});

// TODO add token to signup

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

    const token = signToken(uuid, username, email);

    res
      .cookie("token", token, {
        maxAge: 36000000,
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .json({
        message: "User registered successfully",
      });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
