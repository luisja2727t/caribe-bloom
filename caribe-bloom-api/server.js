const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173").split(",");
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// Rutas
app.use("/api/auth",      require("./routes/auth"));
app.use("/api/fincas",    require("./routes/fincas"));
app.use("/api/cultivos",  require("./routes/cultivos"));
app.use("/api/alertas",   require("./routes/alertas"));
app.use("/api/analisis",  require("./routes/analisis"));
app.use("/api/satelital", require("./routes/satelital"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "Caribe Bloom API" });
});

// Verificar conexión a PostgreSQL y arrancar
pool.query("SELECT 1")
  .then(() => {
    console.log("✅ Conectado a PostgreSQL");
    app.listen(PORT, () => {
      console.log(`🚀 API corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ Error conectando a PostgreSQL:", err.message);
    process.exit(1);
  });