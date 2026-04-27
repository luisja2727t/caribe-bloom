const express = require("express");
const router  = require("express").Router();
const { pool } = require("../db");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Sin token" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
}

router.get("/", auth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT f.*, u.nombre AS nombre_usuario 
       FROM fincas f
       JOIN usuarios u ON f.id_usuario = u.id_usuario
       WHERE f.id_usuario = ?`,
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;