const express = require("express");
const db = require("./db");

const app = express();

app.get("/products", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    res.json(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/health", (req, res) => res.send("OK"));

module.exports = app;