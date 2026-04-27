import { useState, useEffect } from "react";

const FILTROS = ["Todas","Fitosanitario","Nutricional","Riego Crítico","Clima","Mantenimiento"];
const ACOLOR  = { red:"var(--red)", amber:"var(--amber)", blue:"var(--blue)" };
const TCOLOR  = { "Fitosanitario":"red","Riego Crítico":"red","Nutricional":"amber","Mantenimiento":"amber","Clima":"blue" };

export default function Alertas() {
  const [alertas, setAlertas] = useState([]);
  const [filtro,  setFiltro]  = useState("Todas");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("cb_token");
    fetch("/api/alertas", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => { setAlertas(data); setLoading(false); });
  }, []);

  if (loading) return <div className="loading">Cargando...</div>;

  const lista = filtro === "Todas" ? alertas : alertas.filter(a => a.tipo === filtro);
  const criticas = alertas.filter(a => TCOLOR[a.tipo] === "red").length;

  return (
    <div>
      <div className="ph">
        <div className="ph-title">Alertas Activas</div>
        <div className="ph-sub">{alertas.length} alertas · {criticas} críticas</div>
      </div>

      <div className="tabs">
        {FILTROS.map(f => (
          <div key={f} className={`tab ${filtro===f?"on":""}`} onClick={() => setFiltro(f)}>{f}</div>
        ))}
      </div>

      {lista.map(a => {
        const color = TCOLOR[a.tipo] || "blue";
        return (
          <div key={a.id_alerta} style={{ display:"flex", alignItems:"flex-start", gap:12, padding:"14px 16px", background:"var(--surface)", border:"1px solid var(--border)", borderRadius:9, marginBottom:10 }}>
            <div className={`dot dot-${color}`} style={{ marginTop:4 }} />
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:5 }}>
                <span style={{ fontSize:13, fontWeight:700, color:ACOLOR[color] }}>{a.tipo}</span>
                <span className={`badge badge-${color}`}>{a.nombre_finca}</span>
              </div>
              <div style={{ fontSize:13, color:"var(--text2)", marginBottom:6, lineHeight:1.5 }}>{a.descripcion}</div>
              <div style={{ fontSize:12, color:"var(--g300)" }}>→ {a.recomendacion_agronomica}</div>
              <div style={{ fontSize:10, color:"var(--text3)", marginTop:5 }}>
                {new Date(a.fecha_generacion).toLocaleString("es-CO")}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}