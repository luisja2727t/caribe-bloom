import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix icono leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const ESTADO_COLOR = {
  "Floración":"green", "Desarrollo de fruto":"blue", "Producción":"green",
  "Crecimiento vegetativo":"amber", "Germinación":"amber",
  "Desarrollo de raíces":"amber", "Cuajado de fruto":"blue", "Mantenimiento":"red"
};

export default function Parcelas() {
  const [tab,      setTab]      = useState("mapa");
  const [cultivos, setCultivos] = useState([]);
  const [fincas,   setFincas]   = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("cb_token");
    const headers = { Authorization: `Bearer ${token}` };
    Promise.all([
      fetch("/api/cultivos", { headers }).then(r => r.json()),
      fetch("/api/fincas",   { headers }).then(r => r.json()),
    ]).then(([c, f]) => {
      setCultivos(c);
      setFincas(f);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="loading">Cargando...</div>;

  // Parsear coordenadas GPS
  const fincasConCoords = fincas.map(f => {
    const [lat, lng] = f.ubicacion_gps.split(",").map(Number);
    return { ...f, lat, lng };
  }).filter(f => !isNaN(f.lat));

  const centro = fincasConCoords.length > 0
    ? [fincasConCoords[0].lat, fincasConCoords[0].lng]
    : [10.96, -74.78];

  return (
    <div>
      <div className="ph" style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div>
          <div className="ph-title">Mis Parcelas y Cultivos</div>
          <div className="ph-sub">{fincas.length} fincas · {cultivos.length} cultivos activos · Atlántico, Colombia</div>
        </div>
        <button className="btn btn-primary">+ Nueva Parcela</button>
      </div>

      <div className="tabs">
        {["mapa","cultivos","fincas"].map(t => (
          <div key={t} className={`tab ${tab===t?"on":""}`} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase()+t.slice(1)}
          </div>
        ))}
      </div>

      {tab === "mapa" && (
        <div>
          <div className="card" style={{ padding:0, overflow:"hidden", marginBottom:16 }}>
            <div style={{ padding:"14px 18px", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ fontWeight:600, fontSize:14 }}>Vista General del Mapa</div>
              <span style={{ fontSize:11, background:"var(--g100)", color:"var(--g700)", padding:"3px 10px", borderRadius:20, fontWeight:500 }}>Atlántico, Colombia</span>
            </div>
            <MapContainer center={centro} zoom={11} style={{ height:380, width:"100%" }} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; Esri'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
              {fincasConCoords.map(f => (
                <Marker key={f.id_finca} position={[f.lat, f.lng]}>
                  <Popup>
                    <strong>{f.nombre_finca}</strong><br />
                    {f.nombre_usuario}<br />
                    <small>{f.ubicacion_gps}</small>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
            <div style={{ padding:"10px 18px", display:"flex", gap:16 }}>
              {[["#3db866","Óptimo"],["#e8971f","Estrés Hídrico"],["#dc3d3d","Enfermedad Detectada"],["#2678c8","Saludable"]].map(([c,l])=>(
                <div key={l} style={{ display:"flex", alignItems:"center", gap:5, fontSize:11, color:"var(--text3)" }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:c }} />{l}
                </div>
              ))}
            </div>
          </div>

          {/* Cards de fincas */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14 }}>
            {fincas.map(f => {
              const cultivo = cultivos.find(c => c.id_finca === f.id_finca);
              return (
                <div key={f.id_finca} className="card">
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
                    <div style={{ fontWeight:600, fontSize:14 }}>{f.nombre_finca}</div>
                    <span className="badge badge-green">Óptimo</span>
                  </div>
                  <div style={{ fontSize:11, color:"var(--text3)", marginBottom:12 }}>{f.ubicacion_gps}</div>
                  {cultivo && (
                    <>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                          <span style={{ fontSize:14 }}>🌱</span>
                          <span style={{ fontSize:13, fontWeight:500 }}>{cultivo.tipo_planta}</span>
                        </div>
                        <span className={`badge badge-${ESTADO_COLOR[cultivo.estado_fenologico_actual]||"blue"}`}>
                          {cultivo.estado_fenologico_actual}
                        </span>
                      </div>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginTop:10 }}>
                        {[["🌡","--°C","Temperatura"],["💧","--%","Humedad"],["☀","-- W/m²","Radiación"]].map(([icon,val,label])=>(
                          <div key={label} style={{ background:"var(--surface2)", borderRadius:8, padding:"8px 10px", textAlign:"center" }}>
                            <div style={{ fontSize:16 }}>{icon}</div>
                            <div style={{ fontSize:13, fontWeight:600, color:"var(--text)" }}>{val}</div>
                            <div style={{ fontSize:10, color:"var(--text3)" }}>{label}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === "cultivos" && (
        <div className="card">
          <div className="card-label">Cultivos registrados</div>
          <table>
            <thead><tr>
              {["#","Planta","Siembra","Estado","Finca"].map(h => <th key={h}>{h}</th>)}
            </tr></thead>
            <tbody>
              {cultivos.map(c => (
                <tr key={c.id_cultivo}>
                  <td>{c.id_cultivo}</td>
                  <td style={{ fontWeight:500, color:"var(--text)" }}>{c.tipo_planta}</td>
                  <td>{c.fecha_siembra?.slice(0,10)}</td>
                  <td><span className={`badge badge-${ESTADO_COLOR[c.estado_fenologico_actual]||"blue"}`}>{c.estado_fenologico_actual}</span></td>
                  <td>{c.nombre_finca}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "fincas" && (
        <div className="card">
          <div className="card-label">Fincas registradas</div>
          <table>
            <thead><tr>
              {["#","Nombre","Coordenadas GPS","Propietario"].map(h => <th key={h}>{h}</th>)}
            </tr></thead>
            <tbody>
              {fincas.map(f => (
                <tr key={f.id_finca}>
                  <td>{f.id_finca}</td>
                  <td style={{ fontWeight:500, color:"var(--text)" }}>{f.nombre_finca}</td>
                  <td style={{ fontFamily:"monospace", fontSize:11 }}>{f.ubicacion_gps}</td>
                  <td>{f.nombre_usuario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}