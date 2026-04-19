const express = require("express");
const db = require("./db");
const axios = require("axios");

const app = express();
app.use(express.json());

// Create application (order)
app.post("/orders", async (req, res) => {
  const { user_id, product_id } = req.body;

  try {
    // optional: call user-service
    await axios.get(`http://user-service:3000/users`);
    
    const [result] = await db.query(
      "INSERT INTO orders (user_id, product_id) VALUES (?, ?)",
      [user_id, product_id]
    );

    res.json({ id: result.insertId });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/orders", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM orders");
  res.json(rows);
});

app.get("/health", (req, res) => res.send("OK"));

module.exports = app;