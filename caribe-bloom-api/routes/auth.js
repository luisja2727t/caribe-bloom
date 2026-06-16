const express = require("express");
const router  = express.Router();
const jwt     = require("jsonwebtoken");
const bcrypt  = require("bcrypt");
const pool    = require("../db");

// POST /api/auth/registro
router.post("/registro", async (req, res) => {
  const { nombre, correo, telefono, password, rol } = req.body;

  if (!nombre || !correo || !password)
    return res.status(400).json({ error: "Nombre, correo y contraseña son obligatorios" });

  if (password.length < 6)
    return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres" });

  try {
    // Verificar si el correo ya existe
    const existe = await pool.query(
      "SELECT id_usuario FROM usuarios WHERE correo = $1", [correo]
    );
    if (existe.rows.length > 0)
      return res.status(409).json({ error: "Ya existe una cuenta con ese correo" });

    // Hash de la contraseña
    const hash = await bcrypt.hash(password, 10);

    // Insertar usuario
    const result = await pool.query(
      `INSERT INTO usuarios (nombre, correo, password, telefono, rol)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id_usuario, nombre, correo, rol`,
      [nombre, correo, hash, telefono || null, rol || "agricultor"]
    );

    const usuario = result.rows[0];

    const token = jwt.sign(
      { id: usuario.id_usuario, correo: usuario.correo, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.status(201).json({
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

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { correo, password } = req.body;
  if (!correo || !password)
    return res.status(400).json({ error: "Correo y contraseña requeridos" });

  try {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE correo = $1", [correo]
    );

    if (result.rows.length === 0)
      return res.status(401).json({ error: "Credenciales inválidas" });

    const usuario = result.rows[0];

    // Soporte para contraseñas en texto plano (usuarios demo) y bcrypt
    let passwordValida = false;
    const esBcrypt = usuario.password.startsWith("$2b$") || usuario.password.startsWith("$2a$");

    if (esBcrypt) {
      passwordValida = await bcrypt.compare(password, usuario.password);
    } else {
      // Contraseña en texto plano (usuarios de prueba existentes)
      passwordValida = password === usuario.password;
    }

    if (!passwordValida)
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