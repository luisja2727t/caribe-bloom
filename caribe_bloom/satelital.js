const express  = require("express");
const router   = express.Router();
const { pool } = require("../db");
const jwt      = require("jsonwebtoken");

function verificarToken(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "Sin token" });
  try {
    req.usuario = jwt.verify(auth.split(" ")[1], process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
}

router.get("/", verificarToken, async (req, res) => {
  try {
    let query, params;

    if (req.usuario.rol === "Administrador") {
      query = `SELECT ds.*, f.nombre_finca, f.ubicacion_gps
               FROM datos_satelitales ds
               JOIN fincas f ON ds.id_finca = f.id_finca
               ORDER BY ds.fecha_dato DESC`;
      params = [];
    } else {
      query = `SELECT ds.*, f.nombre_finca, f.ubicacion_gps
               FROM datos_satelitales ds
               JOIN fincas f ON ds.id_finca = f.id_finca
               WHERE f.id_usuario = ?
               ORDER BY ds.fecha_dato DESC`;
      params = [req.usuario.id];
    }

    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
