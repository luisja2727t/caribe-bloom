import { useState, useEffect } from "react";

const ESTRES = { Bajo:"green", Moderado:"amber", Alto:"red", Crítico:"red" };

export default function Historial() {
  const [analisis, setAnalisis] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("cb_token");
    fetch("/api/analisis", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => { setAnalisis(data); setLoading(false); });
  }, []);

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <div>
      <div className="ph">
        <div className="ph-title">Historial de Análisis IA</div>
        <div className="ph-sub">{analisis.length} análisis registrados</div>
      </div>

      <div className="card">
        <div className="card-label">Resultados de análisis IA</div>
        <table>
          <thead><tr>
            {["#","Cultivo","Enfermedad","Deficiencia","Estrés","Confianza","Finca"].map(h => <th key={h}>{h}</th>)}
          </tr></thead>
          <tbody>
            {analisis.map(a => (
              <tr key={a.id_analisis}>
                <td>{a.id_analisis}</td>
                <td style={{ fontWeight:500, color:"var(--text)" }}>{a.tipo_planta}</td>
                <td style={{ color: a.enfermedad_detectada!=="Ninguna" ? "var(--red)" : "var(--text2)" }}>{a.enfermedad_detectada}</td>
                <td style={{ color: a.deficiencia_nutricional!=="Ninguna" ? "var(--amber)" : "var(--text2)" }}>{a.deficiencia_nutricional}</td>
                <td><span className={`badge badge-${ESTRES[a.nivel_estres_hidrico]}`}>{a.nivel_estres_hidrico}</span></td>
                <td>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div className="cbar" style={{ width:70 }}>
                      <div className="cfill" style={{ width:`${(a.confianza_modelo*100).toFixed(0)}%` }} />
                    </div>
                    <span style={{ fontSize:11, color:"var(--g300)" }}>{(a.confianza_modelo*100).toFixed(1)}%</span>
                  </div>
                </td>
                <td>{a.nombre_finca}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}