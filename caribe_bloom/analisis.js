const express  = require("express");
const router   = express.Router();
const { pool } = require("../db");
const jwt      = require("jsonwebtoken");

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
      query = `SELECT ai.*, cu.tipo_planta, f.nombre_finca,
                      c.lectura_humedad, c.lectura_temperatura, c.fecha_hora
               FROM analisis_ia ai
               JOIN capturas c  ON ai.id_captura = c.id_captura
               JOIN cultivos cu ON c.id_cultivo  = cu.id_cultivo
               JOIN fincas f    ON cu.id_finca   = f.id_finca
               ORDER BY ai.id_analisis DESC`;
      params = [];
    } else {
      query = `SELECT ai.*, cu.tipo_planta, f.nombre_finca,
                      c.lectura_humedad, c.lectura_temperatura, c.fecha_hora
               FROM analisis_ia ai
               JOIN capturas c  ON ai.id_captura = c.id_captura
               JOIN cultivos cu ON c.id_cultivo  = cu.id_cultivo
               JOIN fincas f    ON cu.id_finca   = f.id_finca
               WHERE f.id_usuario = ?
               ORDER BY ai.id_analisis DESC`;
      params = [req.user.id];
    }

    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/stats", auth, async (req, res) => {
  try {
    let query, params;

    if (req.user.rol === "Administrador") {
      query = `SELECT
                 COUNT(*) AS total,
                 SUM(enfermedad_detectada != 'Ninguna') AS con_enfermedad,
                 SUM(nivel_estres_hidrico IN ('Alto','Crítico')) AS estres_hidrico,
                 ROUND(AVG(confianza_modelo) * 100, 1) AS confianza_promedio
               FROM analisis_ia ai
               JOIN capturas c  ON ai.id_captura = c.id_captura
               JOIN cultivos cu ON c.id_cultivo  = cu.id_cultivo
               JOIN fincas f    ON cu.id_finca   = f.id_finca`;
      params = [];
    } else {
      query = `SELECT
                 COUNT(*) AS total,
                 SUM(enfermedad_detectada != 'Ninguna') AS con_enfermedad,
                 SUM(nivel_estres_hidrico IN ('Alto','Crítico')) AS estres_hidrico,
                 ROUND(AVG(confianza_modelo) * 100, 1) AS confianza_promedio
               FROM analisis_ia ai
               JOIN capturas c  ON ai.id_captura = c.id_captura
               JOIN cultivos cu ON c.id_cultivo  = cu.id_cultivo
               JOIN fincas f    ON cu.id_finca   = f.id_finca
               WHERE f.id_usuario = ?`;
      params = [req.user.id];
    }

    const [rows] = await pool.query(query, params);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
