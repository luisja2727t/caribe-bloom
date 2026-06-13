const router = require("express").Router();
const pool = require("../db");
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
      query = `
        SELECT c.*, f.nombre AS nombre_finca,
               ST_AsGeoJSON(c.ubicacion) AS ubicacion_geojson
        FROM cultivos c
        JOIN fincas f ON c.id_finca = f.id_finca
      `;
      params = [];
    } else {
      query = `
        SELECT c.*, f.nombre AS nombre_finca,
               ST_AsGeoJSON(c.ubicacion) AS ubicacion_geojson
        FROM cultivos c
        JOIN fincas f ON c.id_finca = f.id_finca
        WHERE f.id_usuario = $1
      `;
      params = [req.user.id];
    }

    const result = await pool.query(query, params);

    const cultivosFormateados = result.rows.map(cultivo => {
      const geojson = cultivo.ubicacion_geojson ? JSON.parse(cultivo.ubicacion_geojson) : null;
      const { ubicacion_geojson, ...resto } = cultivo;
      return { ...resto, ubicacion_geojson: geojson };
    });

    res.json(cultivosFormateados);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;