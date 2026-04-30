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
      query = `SELECT a.*
               FROM alertas a
               JOIN analisis_ia ai ON a.id_analisis = ai.id_analisis
               JOIN capturas ca    ON ai.id_captura  = ca.id_captura
               JOIN cultivos c     ON ca.id_cultivo  = c.id_cultivo
               JOIN fincas f       ON c.id_finca     = f.id_finca
               ORDER BY a.fecha_generacion DESC`;
      params = [];
    } else {
      query = `SELECT a.*
               FROM alertas a
               JOIN analisis_ia ai ON a.id_analisis = ai.id_analisis
               JOIN capturas ca    ON ai.id_captura  = ca.id_captura
               JOIN cultivos c     ON ca.id_cultivo  = c.id_cultivo
               JOIN fincas f       ON c.id_finca     = f.id_finca
               WHERE f.id_usuario = ?
               ORDER BY a.fecha_generacion DESC`;
      params = [req.user.id];
    }

    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
