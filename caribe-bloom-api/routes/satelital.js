const express  = require("express");
const router   = express.Router();
const { pool } = require("../db");

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT ds.*, f.nombre_finca, f.ubicacion_gps
       FROM datos_satelitales ds
       JOIN fincas f ON ds.id_finca = f.id_finca
       ORDER BY ds.fecha_dato DESC`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;