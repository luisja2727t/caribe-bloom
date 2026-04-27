import { useState, useEffect } from "react";

export default function Satelite() {
  const [datos,   setDatos]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("cb_token");
    fetch("/api/satelital", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => { setDatos(data); setLoading(false); });
  }, []);

  if (loading) return <div className="loading">Cargando...</div>;

  const promRad = (datos.reduce((s,d) => s+parseFloat(d.radiacion_solar),  0) / datos.length).toFixed(0);
  const promHum = (datos.reduce((s,d) => s+parseFloat(d.humedad_suelo_smap),0) / datos.length).toFixed(1);
  const promTmp = (datos.reduce((s,d) => s+parseFloat(d.temperatura_superficie),0) / datos.length).toFixed(1);

  return (
    <div>
      <div className="ph">
        <div className="ph-title">Análisis Satelital</div>
        <div className="ph-sub">Datos SMAP · Radiación Solar · Temperatura de Superficie</div>
      </div>

      <div className="g4" style={{ marginBottom:18 }}>
        <div className="scard"><div className="scard-label">Rad. Promedio</div><div className="scard-val c-amber">{promRad} W/m²</div></div>
        <div className="scard"><div className="scard-label">Humedad SMAP</div><div className="scard-val c-blue">{promHum}%</div></div>
        <div className="scard"><div className="scard-label">Temp. Superficie</div><div className="scard-val c-red">{promTmp}°C</div></div>
        <div className="scard"><div className="scard-label">Fincas monitoreadas</div><div className="scard-val c-green">{datos.length}</div></div>
      </div>

      <div className="card">
        <div className="card-label">Índices por finca</div>
        <table>
          <thead><tr>
            {["Finca","Radiación Solar","Humedad SMAP","Temp. Superficie","Diagnóstico"].map(h => <th key={h}>{h}</th>)}
          </tr></thead>
          <tbody>
            {datos.map(d => {
              const hum  = parseFloat(d.humedad_suelo_smap);
              const diag = hum < 25 ? ["Estrés Hídrico","red"] : hum > 65 ? ["Exceso Humedad","amber"] : ["Normal","green"];
              return (
                <tr key={d.id_satelite}>
                  <td style={{ fontWeight:500, color:"var(--text)" }}>{d.nombre_finca}</td>
                  <td>{parseFloat(d.radiacion_solar).toFixed(1)} W/m²</td>
                  <td>{hum.toFixed(1)}%</td>
                  <td>{parseFloat(d.temperatura_superficie).toFixed(1)}°C</td>
                  <td><span className={`badge badge-${diag[1]}`}>{diag[0]}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}