import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
 
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});
 
const ACOLOR = { red:"var(--red)", amber:"var(--amber)", blue:"var(--blue)" };
const TCOLOR = { "Fitosanitario":"red","Riego Crítico":"red","Nutricional":"amber","Mantenimiento":"amber","Clima":"blue" };
const ESTRES = { Bajo:"green", Moderado:"amber", Alto:"red", Crítico:"red" };
 
function MapaReal({ fincas }) {
  const coords = fincas.map(f => {
    const [lat, lng] = (f.ubicacion_gps || "").split(",").map(Number);
    return { ...f, lat, lng };
  }).filter(f => !isNaN(f.lat));
 
  const centro = coords.length > 0 ? [coords[0].lat, coords[0].lng] : [10.96, -74.78];
 
  return (
    <div className="map-ph">
      <MapContainer center={centro} zoom={11} style={{ height: 220, width: "100%" }} scrollWheelZoom={false} zoomControl={false}>
        <TileLayer
          attribution='&copy; Esri'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        {coords.map(f => (
          <Marker key={f.id_finca} position={[f.lat, f.lng]}>
            <Popup><strong>{f.nombre_finca}</strong></Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="map-footer">
        {[["#3db866","Óptimo"],["#e8971f","Estrés Hídrico"],["#dc3d3d","Enfermedad"]].map(([c,l]) => (
          <div key={l} className="map-li">
            <div className="map-dot" style={{ background:c }} />{l}
          </div>
        ))}
      </div>
    </div>
  );
}
 
export default function Dashboard() {
  const [fincas,   setFincas]   = useState([]);
  const [alertas,  setAlertas]  = useState([]);
  const [analisis, setAnalisis] = useState([]);
  const [loading,  setLoading]  = useState(true);
 
  useEffect(() => {
    const token = localStorage.getItem("cb_token");
    const h = { Authorization: `Bearer ${token}` };
    Promise.all([
      fetch("/api/fincas",      { headers: h }).then(r => r.json()),
      fetch("/api/alertas",     { headers: h }).then(r => r.json()),
      fetch("/api/analisis", { headers: h }).then(r => r.json()),
    ]).then(([f, al, an]) => {
      setFincas(Array.isArray(f)   ? f  : []);
      setAlertas(Array.isArray(al) ? al : []);
      setAnalisis(Array.isArray(an) ? an : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);
 
  if (loading) return <div className="loading">Cargando...</div>;
 
  const saludables = analisis.filter(a => a.enfermedad_detectada === "Ninguna" && a.nivel_estres_hidrico === "Bajo").length;
  const hidrico    = analisis.filter(a => a.nivel_estres_hidrico === "Alto" || a.nivel_estres_hidrico === "Crítico").length;
  const enfermos   = analisis.filter(a => a.enfermedad_detectada !== "Ninguna").length;
 
  return (
    <div>
      <div className="ph">
        <div className="ph-title">Vista General</div>
        <div className="ph-sub">Fincas activas · Atlántico, Colombia · Actualizado hoy</div>
      </div>
 
      <div className="g4" style={{ marginBottom:18 }}>
        <div className="scard"><div className="scard-label">Parcelas Totales</div><div className="scard-val">{fincas.length}</div><div className="scard-sub">Fincas registradas</div></div>
        <div className="scard"><div className="scard-label">Saludables</div><div className="scard-val c-green">{saludables}</div><div className="scard-sub">Sin alertas activas</div></div>
        <div className="scard"><div className="scard-label">Estrés Hídrico</div><div className="scard-val c-amber">{hidrico}</div><div className="scard-sub">Requieren riego</div></div>
        <div className="scard"><div className="scard-label">Con Enfermedad</div><div className="scard-val c-red">{enfermos}</div><div className="scard-sub">Atención urgente</div></div>
      </div>
 
      <div className="g2" style={{ marginBottom:18 }}>
        <div>
          <div className="sh"><div className="sh-title">Mapa de Parcelas</div><div className="sh-link">Ver satélite →</div></div>
          <MapaReal fincas={fincas} />
        </div>
        <div>
          <div className="sh"><div className="sh-title">Alertas Recientes</div><div className="sh-link">Ver todas →</div></div>
          {alertas.slice(0,4).map(a => {
            const color = TCOLOR[a.tipo] || "blue";
            return (
              <div key={a.id_alerta} style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"10px 12px", background:"var(--surface2)", border:"1px solid var(--border)", borderRadius:8, marginBottom:8, cursor:"pointer" }}>
                <div className={`dot dot-${color}`} style={{ marginTop:3 }} />
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:12, fontWeight:600, color:ACOLOR[color], marginBottom:2 }}>{a.tipo}</div>
                  <div style={{ fontSize:11, color:"var(--text2)" }}>{a.descripcion}</div>
                </div>
                <span style={{ color:"var(--text3)" }}>›</span>
              </div>
            );
          })}
        </div>
      </div>
 
      <div className="card">
        <div className="card-label">Últimos Análisis IA</div>
        {analisis.slice(0,5).map(a => (
          <div key={a.id_analisis} style={{ display:"flex", alignItems:"center", gap:12, padding:"9px 0", borderBottom:"1px solid var(--border)" }}>
            <div style={{ flex:1, fontSize:13, fontWeight:500 }}>
              {a.enfermedad_detectada !== "Ninguna" ? a.enfermedad_detectada :
               a.deficiencia_nutricional !== "Ninguna" ? a.deficiencia_nutricional : "Sin hallazgos"}
            </div>
            <div className="cbar"><div className="cfill" style={{ width:`${(a.confianza_modelo*100).toFixed(0)}%` }} /></div>
            <span style={{ fontSize:11, color:"var(--g300)", minWidth:38 }}>{(a.confianza_modelo*100).toFixed(1)}%</span>
            <span className={`badge badge-${ESTRES[a.nivel_estres_hidrico]}`}>{a.nivel_estres_hidrico}</span>
          </div>
        ))}
      </div>
    </div>
  );
}