const router = require("express").Router();
const pool = require("../db");

// POST /api/contacto
router.post("/", async (req, res) => {
  const { nombre, correo, mensaje } = req.body;

  if (!nombre?.trim() || !correo?.trim() || !mensaje?.trim())
    return res.status(400).json({ error: "Nombre, correo y mensaje son obligatorios" });

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo))
    return res.status(400).json({ error: "Correo no válido" });

  try {
    await pool.query(
      "INSERT INTO mensajes_contacto (nombre, correo, mensaje) VALUES ($1, $2, $3)",
      [nombre.trim(), correo.trim(), mensaje.trim()]
    );
    res.status(201).json({ message: "Mensaje enviado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "No se pudo guardar el mensaje" });
  }
});

module.exports = router;
