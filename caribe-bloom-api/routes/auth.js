const express = require("express");
const router  = express.Router();
const jwt     = require("jsonwebtoken");
const { pool } = require("../db");

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { correo, password } = req.body;
  if (!correo || !password)
    return res.status(400).json({ error: "Correo y contraseña requeridos" });

  try {
    const [rows] = await pool.query(
      "SELECT * FROM usuarios WHERE correo = ?", [correo]
    );
    if (rows.length === 0)
      return res.status(401).json({ error: "Credenciales inválidas" });

    const usuario = rows[0];

    // Por ahora comparación directa (el dump tiene passwords en texto plano)
    if (password !== usuario.password)
      return res.status(401).json({ error: "Credenciales inválidas" });

    const token = jwt.sign(
      { id: usuario.id_usuario, correo: usuario.correo, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      token,
      usuario: {
        id:     usuario.id_usuario,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol:    usuario.rol,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;