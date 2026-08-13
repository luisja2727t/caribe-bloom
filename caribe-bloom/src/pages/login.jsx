import { useState } from "react";

export default function Login({ onLogin, onBack, onRegistroClick }) {
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
      background: "linear-gradient(135deg, #071f14 0%, #12492b 50%, #081712 100%)",
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
        border: "1px solid rgba(47,158,92,0.15)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", left: "-40px", bottom: "-40px",
        width: 260, height: 260, borderRadius: "50%",
        border: "1px solid rgba(47,158,92,0.1)", pointerEvents: "none",
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
            background: "linear-gradient(135deg,#2f9e5c,#12492b)",
            borderRadius: 14, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 28,
            boxShadow: "0 4px 16px rgba(47,158,92,0.35)",
          }}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-11 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg></div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", color: "#071f14" }}>
            Caribe Bloom
          </div>
          <div style={{ fontSize: 11, color: "#6a8a76", marginTop: 3 }}>
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
            <span style={{ fontSize: 11, color: "#248a53", cursor: "pointer" }}>
              ¿Olvidaste tu contraseña?
            </span>
          </div>

          {error && <div className="err" style={{ marginBottom: 14 }}>{error}</div>}

          <button type="submit" className="btn btn-primary"
            style={{ width: "100%", padding: 12, fontSize: 14, boxShadow: "0 4px 14px rgba(47,158,92,0.35)" }}>
            Iniciar Sesión
          </button>
        </form>

        {/* Enlace a registro */}
        <div style={{ textAlign: "center", marginTop: 18, fontSize: 13, color: "#6a8a76" }}>
          ¿No tienes cuenta?{" "}
          <span
            onClick={onRegistroClick}
            style={{ color: "#248a53", fontWeight: 700, cursor: "pointer" }}
          >
            Regístrate aquí
          </span>
        </div>
      </div>
    </div>
  );
}