import { useState, useEffect } from "react";

export default function Configuracion() {
  const [usuario, setUsuario] = useState(null);
  const [fincas,  setFincas]  = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("cb_user");
    if (saved) setUsuario(JSON.parse(saved));

    const token = localStorage.getItem("cb_token");
    fetch("/api/fincas", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => setFincas(Array.isArray(data) ? data : []));
  }, []);

  if (!usuario) return <div className="loading">Cargando...</div>;

  return (
    <div>
      <div className="ph">
        <div className="ph-title">Configuración</div>
        <div className="ph-sub">Información de tu cuenta y fincas registradas</div>
      </div>

      {/* Info del usuario */}
      <div className="card" style={{ marginBottom:16 }}>
        <div className="card-label">Información de la cuenta</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginTop:12 }}>
          {[
            ["ID de usuario", `#${usuario.id}`],
            ["Nombre", usuario.nombre],
            ["Correo", usuario.correo],
            ["Rol", usuario.rol],
          ].map(([label, value]) => (
            <div key={label} style={{ background:"var(--surface2)", borderRadius:8, padding:"12px 16px" }}>
              <div style={{ fontSize:11, color:"var(--text3)", marginBottom:4 }}>{label}</div>
              <div style={{ fontSize:14, fontWeight:600, color:"var(--text)" }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Fincas del usuario */}
      <div className="card">
        <div className="card-label">Mis Fincas ({fincas.length})</div>
        {fincas.length === 0 ? (
          <div style={{ padding:"20px", textAlign:"center", color:"var(--text3)", fontSize:13 }}>
            No tienes fincas registradas aún.
          </div>
        ) : (
          <table style={{ marginTop:12 }}>
            <thead><tr>
              {["#","Nombre","Propietario"].map(h => <th key={h}>{h}</th>)}
            </tr></thead>
            <tbody>
              {fincas.map(f => (
                <tr key={f.id_finca}>
                  <td>{f.id_finca}</td>
                  <td style={{ fontWeight:500, color:"var(--text)" }}>{f.nombre}</td>
                  <td>{f.nombre_usuario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}