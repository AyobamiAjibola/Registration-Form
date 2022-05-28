const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

// register
router.post("/register", validInfo, async (req, res) => {
    const { fname, lname, user_email, user_password, username } = req.body;

    try {
      const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
        user_email
      ]);

      if (user.rows.length > 0) {
        return res.status(401).json("User already exist!");
      }

      const userN = await pool.query("SELECT * FROM users WHERE username = $1", [
        username
      ]);

      if (userN.rows.length > 0) {
        return res.status(401).json("Username has already been taken!");
      }

      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(user_password, salt);

      let newUser = await pool.query(
        "INSERT INTO users (fname, lname, user_email, user_password, username) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [fname, lname, user_email, bcryptPassword, username]
      );

      const jwtToken = jwtGenerator(newUser.rows[0].user_id);

      return res.json({ jwtToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });


// Login
  router.post("/login", validInfo, async (req, res) => {
    const { user_email, user_password } = req.body;

    try {
      const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
        user_email
      ]);

      if (user.rows.length === 0) {
        return res.status(401).json("Invalid Credential");
      }

      const validPassword = await bcrypt.compare(
        user_password,
        user.rows[0].user_password
      );

      if (!validPassword) {
        return res.status(401).json("Invalid Credential");
      }
      const jwtToken = jwtGenerator(user.rows[0].user_id);
      return res.json({ jwtToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  router.post("/verify", authorize, (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  module.exports = router;