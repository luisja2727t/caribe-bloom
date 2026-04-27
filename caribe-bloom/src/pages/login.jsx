import { useState } from "react";

export default function Login({ onLogin, onBack }) {
  const [correo,   setCorreo]   = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!correo || !password) { setError("Completa todos los campos"); return; }
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Credenciales inválidas"); return; }
      localStorage.setItem("cb_token", data.token);
      onLogin(data.usuario);
    } catch {
      setError("No se pudo conectar al servidor");
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #0a3d1f 0%, #1e7a40 50%, #0f2d1a 100%)",
      position: "relative", overflow: "hidden",
    }}>

      {onBack && (
        <button onClick={onBack} style={{
          position: "absolute", top: 22, left: 24,
          background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: 8, color: "rgba(255,255,255,0.8)", cursor: "pointer",
          fontSize: 13, padding: "8px 16px", display: "flex", alignItems: "center", gap: 6,
        }}>
          ← Volver
        </button>
      )}

      <div style={{
        position: "absolute", right: "-60px", top: "-60px",
        width: 380, height: 380, borderRadius: "50%",
        border: "1px solid rgba(61,184,102,0.15)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", left: "-40px", bottom: "-40px",
        width: 260, height: 260, borderRadius: "50%",
        border: "1px solid rgba(61,184,102,0.1)", pointerEvents: "none",
      }} />

      <div style={{
        position: "relative", zIndex: 1,
        background: "rgba(255,255,255,0.97)",
        borderRadius: 18, padding: "40px 36px", width: 380,
        boxShadow: "0 24px 60px rgba(0,0,0,0.3)",
      }}>
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <div style={{
            width: 56, height: 56, margin: "0 auto 14px",
            background: "linear-gradient(135deg,#3db866,#1e7a40)",
            borderRadius: 14, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 28,
            boxShadow: "0 4px 16px rgba(61,184,102,0.35)",
          }}>🌿</div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", color: "#0a3d1f" }}>
            Caribe Bloom
          </div>
          <div style={{ fontSize: 11, color: "#7a9e87", marginTop: 3 }}>
            Plataforma de Monitoreo Agrícola
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="fgroup">
            <label className="flabel">Correo electrónico</label>
            <input className="finput" type="email" placeholder="usuario@finca.com"
              value={correo} onChange={e => setCorreo(e.target.value)} />
          </div>
          <div className="fgroup">
            <label className="flabel">Contraseña</label>
            <input className="finput" type="password" placeholder="••••••••"
              value={password} onChange={e => setPassword(e.target.value)} />
          </div>

          <div style={{ textAlign: "right", marginTop: -8, marginBottom: 16 }}>
            <span style={{ fontSize: 11, color: "#2d9e4f", cursor: "pointer" }}>
              ¿Olvidaste tu contraseña?
            </span>
          </div>

          {error && <div className="err" style={{ marginBottom: 14 }}>{error}</div>}

          <button type="submit" className="btn btn-primary"
            style={{ width: "100%", padding: 12, fontSize: 14, boxShadow: "0 4px 14px rgba(45,158,79,0.35)" }}>
            Iniciar Sesión
          </button>
        </form>

        <div style={{
          marginTop: 18, padding: "12px 14px",
          background: "#f0f4f2", borderRadius: 8,
          fontSize: 11, color: "#7a9e87", lineHeight: 1.8,
          border: "1px solid rgba(0,0,0,0.06)",
        }}>
          <strong style={{ color: "#3d6b4f" }}>Demo:</strong><br />
          carlos@finca.com / hash_secreto_123
        </div>
      </div>
    </div>
  );
}