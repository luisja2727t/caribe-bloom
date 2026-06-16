import { useState, useEffect, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Polygon } from "@react-google-maps/api";

const LIBRARIES = [];

const ESTADO_COLOR = {
  "Floración":"green", "Desarrollo de fruto":"blue", "Producción":"green",
  "Crecimiento vegetativo":"amber", "Germinación":"amber",
  "Desarrollo de raíces":"amber", "Cuajado de fruto":"blue", "Mantenimiento":"red"
};

const MAP_CENTER = { lat: 10.96, lng: -74.78 };

export default function Parcelas() {
  const [tab,           setTab]           = useState("mapa");
  const [cultivos,      setCultivos]      = useState([]);
  const [fincas,        setFincas]        = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [dibujando,     setDibujando]     = useState(false);
  const [puntosNuevos,  setPuntosNuevos]  = useState([]);
  const [modal,         setModal]         = useState(false);
  const [nombreFinca,   setNombreFinca]   = useState("");
  const [guardando,     setGuardando]     = useState(false);
  const [coordsGuardar, setCoordsGuardar] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
    libraries: LIBRARIES,
  });

  const cargarDatos = () => {
    const token = localStorage.getItem("cb_token");
    const headers = { Authorization: `Bearer ${token}` };
    Promise.all([
      fetch("/api/cultivos", { headers }).then(r => r.json()),
      fetch("/api/fincas",   { headers }).then(r => r.json()),
    ]).then(([c, f]) => {
      setCultivos(Array.isArray(c) ? c : []);
      setFincas(Array.isArray(f) ? f : []);
      setLoading(false);
    });
  };

  useEffect(() => { cargarDatos(); }, []);

  const onMapClick = useCallback((e) => {
    if (!dibujando) return;
    const punto = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setPuntosNuevos(prev => [...prev, punto]);
  }, [dibujando]);

  const cerrarPoligono = () => {
    if (puntosNuevos.length < 3) return;
    setCoordsGuardar(puntosNuevos);
    setPuntosNuevos([]);
    setDibujando(false);
    setModal(true);
  };

  const cancelarDibujo = () => {
    setPuntosNuevos([]);
    setDibujando(false);
  };

  const guardarFinca = async () => {
    if (!nombreFinca.trim()) return;
    setGuardando(true);
    try {
      const token = localStorage.getItem("cb_token");
      const res = await fetch("/api/fincas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ nombre: nombreFinca, coordenadas: coordsGuardar })
      });
      const data = await res.json();
      if (res.ok) {
        setModal(false);
        setNombreFinca("");
        setCoordsGuardar(null);
        cargarDatos(); // recargar fincas
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Error al guardar: " + err.message);
    } finally {
      setGuardando(false);
    }
  };

  const parsearZona = (geojson) => {
    if (!geojson || !geojson.coordinates) return [];
    return geojson.coordinates[0].map(([lng, lat]) => ({ lat, lng }));
  };

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <div>
      {/* Modal para nombrar la finca */}
      {modal && (
        <div style={{
          position:"fixed", inset:0, background:"rgba(0,0,0,0.5)",
          display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000
        }}>
          <div style={{
            background:"var(--surface)", borderRadius:12, padding:28,
            width:380, boxShadow:"0 20px 60px rgba(0,0,0,0.3)"
          }}>
            <div style={{ fontWeight:700, fontSize:16, marginBottom:6 }}>Guardar Nueva Finca</div>
            <div style={{ fontSize:13, color:"var(--text3)", marginBottom:20 }}>
              Polígono con {coordsGuardar?.length} puntos delimitado correctamente.
            </div>
            <label style={{ fontSize:12, fontWeight:600, color:"var(--text2)", display:"block", marginBottom:6 }}>
              Nombre de la finca
            </label>
            <input
              type="text"
              value={nombreFinca}
              onChange={e => setNombreFinca(e.target.value)}
              placeholder="Ej: Finca El Mango"
              style={{
                width:"100%", padding:"10px 12px", borderRadius:8,
                border:"1px solid var(--border)", fontSize:14,
                background:"var(--surface2)", color:"var(--text)",
                boxSizing:"border-box", marginBottom:20
              }}
              onKeyDown={e => e.key === "Enter" && guardarFinca()}
              autoFocus
            />
            <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
              <button
                className="btn"
                onClick={() => { setModal(false); setNombreFinca(""); setCoordsGuardar(null); }}
                disabled={guardando}
              >
                Cancelar
              </button>
              <button
                className="btn btn-primary"
                onClick={guardarFinca}
                disabled={guardando || !nombreFinca.trim()}
              >
                {guardando ? "Guardando..." : "Guardar Finca"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="ph" style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div>
          <div className="ph-title">Mis Parcelas y Cultivos</div>
          <div className="ph-sub">{fincas.length} fincas · {cultivos.length} cultivos activos · Atlántico, Colombia</div>
        </div>
        <button className="btn btn-primary" onClick={() => { setDibujando(true); setPuntosNuevos([]); }}>
          + Nueva Parcela
        </button>
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
          {dibujando && (
            <div style={{ background:"#fef3c7", border:"1px solid #f59e0b", borderRadius:8, padding:"10px 16px", marginBottom:12, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <span style={{ fontSize:13, color:"#92400e" }}>
                ✏️ Haz clic en el mapa para marcar los puntos del perímetro. Puntos marcados: <strong>{puntosNuevos.length}</strong>
              </span>
              <div style={{ display:"flex", gap:8 }}>
                <button
                  className="btn btn-primary"
                  style={{ fontSize:12, padding:"4px 12px" }}
                  onClick={cerrarPoligono}
                  disabled={puntosNuevos.length < 3}
                >
                  ✓ Cerrar Polígono
                </button>
                <button
                  className="btn"
                  style={{ fontSize:12, padding:"4px 12px" }}
                  onClick={cancelarDibujo}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          <div className="card" style={{ padding:0, overflow:"hidden", marginBottom:16 }}>
            <div style={{ padding:"14px 18px", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ fontWeight:600, fontSize:14 }}>Vista General del Mapa</div>
              <span style={{ fontSize:11, background:"var(--g100)", color:"var(--g700)", padding:"3px 10px", borderRadius:20, fontWeight:500 }}>
                Atlántico, Colombia
              </span>
            </div>

            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={{ height: 420, width: "100%" }}
                center={MAP_CENTER}
                zoom={11}
                mapTypeId="satellite"
                options={{
                  mapTypeControl: true,
                  streetViewControl: false,
                  fullscreenControl: true,
                }}
                onClick={onMapClick}
              >
                {fincas.map(f => {
                  const coords = parsearZona(f.ubicacion_geojson);
                  if (coords.length === 0) return null;
                  return (
                    <Polygon
                      key={f.id_finca}
                      paths={coords}
                      options={{
                        fillColor: "#3db866",
                        fillOpacity: 0.3,
                        strokeColor: "#3db866",
                        strokeWeight: 2,
                      }}
                    />
                  );
                })}

                {puntosNuevos.length > 1 && (
                  <Polygon
                    paths={puntosNuevos}
                    options={{
                      fillColor: "#f59e0b",
                      fillOpacity: 0.2,
                      strokeColor: "#f59e0b",
                      strokeWeight: 2,
                    }}
                  />
                )}
              </GoogleMap>
            ) : (
              <div style={{ height:420, display:"flex", alignItems:"center", justifyContent:"center" }}>
                Cargando mapa...
              </div>
            )}

            <div style={{ padding:"10px 18px", display:"flex", gap:16 }}>
              {[["#3db866","Fincas guardadas"],["#f59e0b","Dibujando"]].map(([c,l])=>(
                <div key={l} style={{ display:"flex", alignItems:"center", gap:5, fontSize:11, color:"var(--text3)" }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:c }} />{l}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14 }}>
            {fincas.map(f => {
              const cultivo = cultivos.find(c => c.id_finca === f.id_finca);
              return (
                <div key={f.id_finca} className="card">
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
                    <div style={{ fontWeight:600, fontSize:14 }}>{f.nombre}</div>
                    <span className="badge badge-green">Óptimo</span>
                  </div>
                  {cultivo && (
                    <>
                      <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
                        <span style={{ fontSize:14 }}>🌱</span>
                        <span style={{ fontSize:13, fontWeight:500 }}>{cultivo.tipo_planta}</span>
                      </div>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
                        {[["🌡", cultivo.lectura_temperatura ? `${parseFloat(cultivo.lectura_temperatura).toFixed(1)}°C` : "--°C", "Temperatura"],
                          ["💧", cultivo.lectura_humedad ? `${parseFloat(cultivo.lectura_humedad).toFixed(1)}%` : "--%", "Humedad"],
                          ["☀", cultivo.radiacion_solar ? `${parseFloat(cultivo.radiacion_solar).toFixed(0)} W/m²` : "-- W/m²", "Radiación"]
                            ].map(([icon,val,label])=>(
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
        </div>
      )}
    </div>
  );
}