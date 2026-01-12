const express = require("express");
const { pool } = require("../db");

const router = express.Router();

// GET /products
router.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT id, name, price FROM products ORDER BY id DESC LIMIT 50");
  res.json(rows);
});

// POST /products
router.post("/", async (req, res) => {
  const { name, price } = req.body || {};
  if (!name || typeof name !== "string") return res.status(400).json({ error: "name requis" });
  const p = Number(price);
  if (!Number.isFinite(p) || p < 0) return res.status(400).json({ error: "price invalide" });

  const [result] = await pool.query("INSERT INTO products (name, price) VALUES (?, ?)", [name, p]);
  res.status(201).json({ id: result.insertId, name, price: p });
});

module.exports = router;
