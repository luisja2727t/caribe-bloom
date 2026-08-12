require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

if (!process.env.DATABASE_URL) {
  console.error('Falta DATABASE_URL en el .env');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  const { rows } = await pool.query(
    `SELECT id_usuario, correo FROM usuarios WHERE password NOT LIKE '$2%'`
  );

  if (rows.length === 0) {
    console.log("No hay contraseñas en texto plano. Todo limpio.");
    return process.exit(0);
  }

  console.log(`Encontrados ${rows.length} usuarios con contraseña en texto plano:\n`);

  for (const u of rows) {
    const nuevaPassword = crypto.randomBytes(6).toString('hex'); // 12 caracteres
    const hash = await bcrypt.hash(nuevaPassword, 10);
    await pool.query(`UPDATE usuarios SET password = $1 WHERE id_usuario = $2`, [hash, u.id_usuario]);
    console.log(`${u.correo}  ->  ${nuevaPassword}`);
  }

  console.log("\nGuarda estas contraseñas nuevas — ya quedaron hasheadas en la base de datos.");
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });