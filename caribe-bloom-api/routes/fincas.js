const express = require("express");
const router = express.Router();
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

// GET /api/fincas
router.get("/", auth, async (req, res) => {
  try {
    let query, params;

    if (req.user.rol === "Administrador") {
      query = `
        SELECT f.id_finca, f.nombre, f.id_usuario,
               ST_AsGeoJSON(f.zona) AS ubicacion_geojson,
               u.nombre AS nombre_usuario
        FROM fincas f
        JOIN usuarios u ON f.id_usuario = u.id_usuario
      `;
      params = [];
    } else {
      query = `
        SELECT f.id_finca, f.nombre, f.id_usuario,
               ST_AsGeoJSON(f.zona) AS ubicacion_geojson,
               u.nombre AS nombre_usuario
        FROM fincas f
        JOIN usuarios u ON f.id_usuario = u.id_usuario
        WHERE f.id_usuario = $1
      `;
      params = [req.user.id];
    }

    const result = await pool.query(query, params);

    const fincasFormateadas = result.rows.map(finca => {
      const geojson = finca.ubicacion_geojson ? JSON.parse(finca.ubicacion_geojson) : null;
      const { ubicacion_geojson, ...resto } = finca;
      return { ...resto, ubicacion_geojson: geojson };
    });

    res.json(fincasFormateadas);
  } catch (error) {
    console.error("Error al obtener fincas:", error);
    res.status(500).json({ error: "Error al obtener fincas" });
  }
});

// POST /api/fincas
router.post("/", auth, async (req, res) => {
  const { nombre, coordenadas } = req.body;

  if (!nombre || !coordenadas || coordenadas.length < 3) {
    return res.status(400).json({ error: "Nombre y al menos 3 coordenadas son requeridos" });
  }

  try {
    // Cerrar el polígono repitiendo el primer punto al final
    const puntos = [...coordenadas, coordenadas[0]];
    const wkt = "POLYGON((" + puntos.map(p => `${p.lng} ${p.lat}`).join(", ") + "))";

    const result = await pool.query(
      `INSERT INTO fincas (nombre, id_usuario, zona)
       VALUES ($1, $2, ST_GeomFromText($3, 4326))
       RETURNING id_finca, nombre, id_usuario`,
      [nombre, req.user.id, wkt]
    );

    res.status(201).json({
      message: "Finca creada exitosamente",
      finca: result.rows[0]
    });
  } catch (error) {
    console.error("Error al crear finca:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;