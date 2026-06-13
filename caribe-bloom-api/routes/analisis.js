const express = require("express");
const router  = express.Router();
const pool    = require("../db");
const jwt     = require("jsonwebtoken");

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
      query = `
        SELECT ai.*, cu.tipo AS tipo_planta, f.nombre AS nombre_finca,
               c.notas, c.fecha
        FROM analisis_ia ai
        JOIN capturas c  ON ai.id_captura = c.id_captura
        JOIN cultivos cu ON c.id_cultivo  = cu.id_cultivo
        JOIN fincas f    ON cu.id_finca   = f.id_finca
        ORDER BY ai.id_analisis DESC
      `;
      params = [];
    } else {
      query = `
        SELECT ai.*, cu.tipo AS tipo_planta, f.nombre AS nombre_finca,
               c.notas, c.fecha
        FROM analisis_ia ai
        JOIN capturas c  ON ai.id_captura = c.id_captura
        JOIN cultivos cu ON c.id_cultivo  = cu.id_cultivo
        JOIN fincas f    ON cu.id_finca   = f.id_finca
        WHERE f.id_usuario = $1
        ORDER BY ai.id_analisis DESC
      `;
      params = [req.user.id];
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/stats", auth, async (req, res) => {
  try {
    let query, params;

    if (req.user.rol === "Administrador") {
      query = `
        SELECT
          COUNT(*) AS total,
          SUM(CASE WHEN ai.resultado != 'Ninguna' THEN 1 ELSE 0 END) AS con_enfermedad,
          ROUND(AVG(ai.confianza) * 100, 1) AS confianza_promedio
        FROM analisis_ia ai
        JOIN capturas c  ON ai.id_captura = c.id_captura
        JOIN cultivos cu ON c.id_cultivo  = cu.id_cultivo
        JOIN fincas f    ON cu.id_finca   = f.id_finca
      `;
      params = [];
    } else {
      query = `
        SELECT
          COUNT(*) AS total,
          SUM(CASE WHEN ai.resultado != 'Ninguna' THEN 1 ELSE 0 END) AS con_enfermedad,
          ROUND(AVG(ai.confianza) * 100, 1) AS confianza_promedio
        FROM analisis_ia ai
        JOIN capturas c  ON ai.id_captura = c.id_captura
        JOIN cultivos cu ON c.id_cultivo  = cu.id_cultivo
        JOIN fincas f    ON cu.id_finca   = f.id_finca
        WHERE f.id_usuario = $1
      `;
      params = [req.user.id];
    }

    const result = await pool.query(query, params);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;