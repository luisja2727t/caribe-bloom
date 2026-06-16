import { useState } from "react";

export default function Registro({ onRegistro, onLoginClick }) {
  const [nombre,   setNombre]   = useState("");
  const [correo,   setCorreo]   = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const validar = () => {
    if (!nombre.trim())   return "El nombre es obligatorio";
    if (!correo.trim())   return "El correo es obligatorio";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) return "Correo no válido";
    if (!telefono.trim()) return "El teléfono es obligatorio";
    if (password.length < 6) return "La contraseña debe tener al menos 6 caracteres";
    if (password !== confirm)  return "Las contraseñas no coinciden";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validar();
    if (err) { setError(err); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, telefono, password, rol: "agricultor" }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Error al registrarse"); return; }
      localStorage.setItem("cb_token", data.token);
      onRegistro(data.usuario);
    } catch {
      setError("No se pudo conectar al servidor");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "11px 14px", borderRadius: 9,
    border: "1.5px solid #d8e8dc", fontSize: 13, outline: "none",
    boxSizing: "border-box", background: "#f8fbf9", color: "#0a3d1f",
    transition: "border-color 0.2s",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  };

  const labelStyle = {
    fontSize: 12, fontWeight: 600, color: "#0a3d1f",
    display: "block", marginBottom: 6,
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #0a3d1f 0%, #1e7a40 50%, #0f2d1a 100%)",
      position: "relative", overflow: "hidden",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>

      {/* Botón volver */}
      <button onClick={onLoginClick} style={{
        position: "absolute", top: 22, left: 24,
        background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: 8, color: "rgba(255,255,255,0.8)", cursor: "pointer",
        fontSize: 13, padding: "8px 16px", display: "flex", alignItems: "center", gap: 6,
      }}>← Volver</button>

      {/* Círculos decorativos */}
      <div style={{ position: "absolute", right: "-60px", top: "-60px", width: 380, height: 380, borderRadius: "50%", border: "1px solid rgba(61,184,102,0.15)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: "-40px", bottom: "-40px", width: 260, height: 260, borderRadius: "50%", border: "1px solid rgba(61,184,102,0.1)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: "15%", bottom: "10%", width: 160, height: 160, borderRadius: "50%", border: "1px solid rgba(61,184,102,0.08)", pointerEvents: "none" }} />

      {/* Card */}
      <div style={{
        position: "relative", zIndex: 1,
        background: "rgba(255,255,255,0.97)",
        borderRadius: 20, padding: "40px 38px", width: 420,
        boxShadow: "0 24px 60px rgba(0,0,0,0.3)",
      }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{
            width: 56, height: 56, margin: "0 auto 14px",
            background: "linear-gradient(135deg,#3db866,#1e7a40)",
            borderRadius: 14, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 28,
            boxShadow: "0 4px 16px rgba(61,184,102,0.35)",
          }}>🌿</div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", color: "#0a3d1f" }}>
            Crear cuenta
          </div>
          <div style={{ fontSize: 12, color: "#7a9e87", marginTop: 4 }}>
            Únete a Caribe Bloom · Monitoreo Agrícola
          </div>
        </div>

        {/* Badge rol */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "rgba(61,184,102,0.08)", border: "1px solid rgba(61,184,102,0.25)",
          borderRadius: 8, padding: "9px 14px", marginBottom: 22,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3db866", flexShrink: 0 }} />
          <span style={{ fontSize: 12, color: "#2d7a44", fontWeight: 600 }}>
            Rol asignado: <strong>Agricultor</strong>
          </span>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Nombre */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Nombre completo</label>
            <input
              type="text" placeholder="Ej. Carlos Martínez"
              value={nombre} onChange={e => setNombre(e.target.value)}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = "#3db866"}
              onBlur={e => e.target.style.borderColor = "#d8e8dc"}
            />
          </div>

          {/* Correo */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Correo electrónico</label>
            <input
              type="email" placeholder="usuario@finca.com"
              value={correo} onChange={e => setCorreo(e.target.value)}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = "#3db866"}
              onBlur={e => e.target.style.borderColor = "#d8e8dc"}
            />
          </div>

          {/* Teléfono */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Teléfono</label>
            <input
              type="tel" placeholder="+57 300 000 0000"
              value={telefono} onChange={e => setTelefono(e.target.value)}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = "#3db866"}
              onBlur={e => e.target.style.borderColor = "#d8e8dc"}
            />
          </div>

          {/* Contraseña */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Contraseña</label>
            <input
              type="password" placeholder="Mínimo 6 caracteres"
              value={password} onChange={e => setPassword(e.target.value)}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = "#3db866"}
              onBlur={e => e.target.style.borderColor = "#d8e8dc"}
            />
          </div>

          {/* Confirmar contraseña */}
          <div style={{ marginBottom: 22 }}>
            <label style={labelStyle}>Confirmar contraseña</label>
            <input
              type="password" placeholder="Repite tu contraseña"
              value={confirm} onChange={e => setConfirm(e.target.value)}
              style={{
                ...inputStyle,
                borderColor: confirm && confirm !== password ? "#e53935" : "#d8e8dc",
              }}
              onFocus={e => e.target.style.borderColor = confirm !== password ? "#e53935" : "#3db866"}
              onBlur={e => e.target.style.borderColor = confirm && confirm !== password ? "#e53935" : "#d8e8dc"}
            />
            {confirm && confirm !== password && (
              <div style={{ fontSize: 11, color: "#e53935", marginTop: 5 }}>Las contraseñas no coinciden</div>
            )}
          </div>

          {/* Error global */}
          {error && (
            <div style={{
              background: "rgba(229,57,53,0.07)", border: "1px solid rgba(229,57,53,0.25)",
              borderRadius: 8, padding: "10px 14px", marginBottom: 16,
              fontSize: 12, color: "#c62828", fontWeight: 500,
            }}>{error}</div>
          )}

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "13px", background: loading ? "#7a9e87" : "#3db866",
              border: "none", borderRadius: 10, color: "#fff",
              fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
              boxShadow: loading ? "none" : "0 4px 14px rgba(45,158,79,0.35)",
              transition: "all 0.2s",
            }}
          >
            {loading ? "Creando cuenta..." : "Crear cuenta →"}
          </button>
        </form>

        {/* Link a login */}
        <div style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#7a9e87" }}>
          ¿Ya tienes cuenta?{" "}
          <span
            onClick={onLoginClick}
            style={{ color: "#2d9e4f", fontWeight: 700, cursor: "pointer" }}
          >
            Iniciar sesión
          </span>
        </div>
      </div>
    </div>
  );
}