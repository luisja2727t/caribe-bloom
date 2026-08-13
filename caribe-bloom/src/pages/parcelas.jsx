import { useState, useEffect, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Polygon } from "@react-google-maps/api";

const IconPencil = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
);
const IconCheck = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
);
const IconSprout = ({ size = 14, color = "#2f9e5c" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10"/><path d="M12 20v-9"/><path d="M12 11c-3 0-6-1.5-6-6 4 0 6 1.5 6 4"/><path d="M12 11c3 0 6-2 6-7-4 0-6 2-6 5"/></svg>
);
const IconThermometer = ({ size = 16, color = "#4c6b5a" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>
);
const IconDroplet = ({ size = 16, color = "#4c6b5a" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.4-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7Z"/></svg>
);
const IconSun = ({ size = 16, color = "#4c6b5a" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
);

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
  const [modalError,    setModalError]    = useState("");

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
    setModalError("");
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
        setModalError("");
        cargarDatos(); // recargar fincas
      } else {
        setModalError(data.error || "No se pudo guardar la finca");
      }
    } catch (err) {
      setModalError("No se pudo guardar la finca. Intenta de nuevo.");
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
            {modalError && <div className="err" style={{ marginBottom:16 }}>{modalError}</div>}
            <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
              <button
                className="btn"
                onClick={() => { setModal(false); setNombreFinca(""); setCoordsGuardar(null); setModalError(""); }}
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
              <span style={{ fontSize:13, color:"#92400e", display:"flex", alignItems:"center", gap:7 }}>
                <IconPencil size={14} color="#92400e" /> Haz clic en el mapa para marcar los puntos del perímetro. Puntos marcados: <strong>{puntosNuevos.length}</strong>
              </span>
              <div style={{ display:"flex", gap:8 }}>
                <button
                  className="btn btn-primary"
                  style={{ fontSize:12, padding:"4px 12px" }}
                  onClick={cerrarPoligono}
                  disabled={puntosNuevos.length < 3}
                >
                  <span style={{ display:"inline-flex", alignItems:"center", gap:5 }}><IconCheck size={13} color="#fff" /> Cerrar Polígono</span>
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
                        fillColor: "#2f9e5c",
                        fillOpacity: 0.3,
                        strokeColor: "#2f9e5c",
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
              {[["#2f9e5c","Fincas guardadas"],["#f59e0b","Dibujando"]].map(([c,l])=>(
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
                        <IconSprout size={14} />
                        <span style={{ fontSize:13, fontWeight:500 }}>{cultivo.tipo_planta}</span>
                      </div>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
                        {[[<IconThermometer />, cultivo.lectura_temperatura ? `${parseFloat(cultivo.lectura_temperatura).toFixed(1)}°C` : "--°C", "Temperatura"],
                          [<IconDroplet />, cultivo.lectura_humedad ? `${parseFloat(cultivo.lectura_humedad).toFixed(1)}%` : "--%", "Humedad"],
                          [<IconSun />, cultivo.radiacion_solar ? `${parseFloat(cultivo.radiacion_solar).toFixed(0)} W/m²` : "-- W/m²", "Radiación"]
                            ].map(([icon,val,label])=>(
                          <div key={label} style={{ background:"var(--surface2)", borderRadius:8, padding:"8px 10px", textAlign:"center" }}>
                            <div style={{ display:"flex", alignItems:"center", justifyContent:"center" }}>{icon}</div>
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