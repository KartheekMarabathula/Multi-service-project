const express = require("express");
const db = require("./db");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.send("OK I am Healthy");
});

app.get("/users", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = app;
