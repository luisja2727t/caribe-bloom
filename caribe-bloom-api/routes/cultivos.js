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
               ST_AsGeoJSON(c.ubicacion) AS ubicacion_geojson,
               cap.lectura_humedad,
               cap.lectura_temperatura,
               ds.radiacion_solar
        FROM cultivos c
        JOIN fincas f ON c.id_finca = f.id_finca
        LEFT JOIN LATERAL (
          SELECT lectura_humedad, lectura_temperatura
          FROM capturas
          WHERE id_cultivo = c.id_cultivo
          ORDER BY fecha DESC LIMIT 1
        ) cap ON true
        LEFT JOIN LATERAL (
          SELECT radiacion_solar
          FROM datos_satelitales
          WHERE id_finca = c.id_finca
          ORDER BY fecha_dato DESC LIMIT 1
        ) ds ON true
      `;
      params = [];
    } else {
      query = `
        SELECT c.*, f.nombre AS nombre_finca,
               ST_AsGeoJSON(c.ubicacion) AS ubicacion_geojson,
               cap.lectura_humedad,
               cap.lectura_temperatura,
               ds.radiacion_solar
        FROM cultivos c
        JOIN fincas f ON c.id_finca = f.id_finca
        LEFT JOIN LATERAL (
          SELECT lectura_humedad, lectura_temperatura
          FROM capturas
          WHERE id_cultivo = c.id_cultivo
          ORDER BY fecha DESC LIMIT 1
        ) cap ON true
        LEFT JOIN LATERAL (
          SELECT radiacion_solar
          FROM datos_satelitales
          WHERE id_finca = c.id_finca
          ORDER BY fecha_dato DESC LIMIT 1
        ) ds ON true
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