const router = require("express").Router();
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
    let query, params;

    if (req.user.rol === "Administrador") {
      query = `SELECT c.*, f.nombre_finca
               FROM cultivos c
               JOIN fincas f ON c.id_finca = f.id_finca`;
      params = [];
    } else {
      query = `SELECT c.*, f.nombre_finca
               FROM cultivos c
               JOIN fincas f ON c.id_finca = f.id_finca
               WHERE f.id_usuario = ?`;
      params = [req.user.id];
    }

    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
