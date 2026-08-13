import { useState, useEffect, useRef } from "react";
import heroImg from "../assets/hero.png";

const IconLeaf = ({ size = 20, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-11 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);
const IconSatellite = ({ size = 26, color = "#2f9e5c" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 10a7.31 7.31 0 0 0 10 10Z" /><path d="m9 15 3-3" /><path d="M17 13a6 6 0 0 0-6-6" /><path d="M21 13A10 10 0 0 0 11 3" />
  </svg>
);
const IconCpu = ({ size = 26, color = "#2f9e5c" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" />
    <path d="M15 2v2M9 2v2M15 20v2M9 20v2M20 15h2M20 9h2M2 15h2M2 9h2" />
  </svg>
);
const IconBell = ({ size = 26, color = "#2f9e5c" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);
const IconMap = ({ size = 26, color = "#2f9e5c" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" /><line x1="9" y1="3" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="21" />
  </svg>
);
const IconBarChart = ({ size = 26, color = "#2f9e5c" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" />
  </svg>
);
const IconSprout = ({ size = 26, color = "#2f9e5c" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 20h10" /><path d="M12 20v-9" /><path d="M12 11c-3 0-6-1.5-6-6 4 0 6 1.5 6 4" /><path d="M12 11c3 0 6-2 6-7-4 0-6 2-6 5" />
  </svg>
);
const IconMail = ({ size = 22, color = "#2f9e5c" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" />
  </svg>
);
const IconPhone = ({ size = 22, color = "#2f9e5c" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IconMapPin = ({ size = 22, color = "#2f9e5c" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

const FEATURES = [
  { icon: <IconSatellite />, title: "Análisis Satelital", desc: "Accede a imágenes NDVI actualizadas de tus cultivos. Los índices de vegetación permiten identificar estrés hídrico y cambios en la salud del cultivo antes de que sean visibles a simple vista.", puntos: ["Índice NDVI en tiempo real", "Detección temprana de estrés hídrico", "Cobertura satelital por parcela"] },
  { icon: <IconCpu />, title: "IA Agrícola", desc: "Nuestro motor de inteligencia artificial analiza imágenes de campo para identificar enfermedades —como el Fusarium Raza 4 Tropical—, plagas y deficiencias nutricionales.", puntos: ["Detección de enfermedades y plagas", "Análisis de deficiencias nutricionales", "Modelos entrenados con datos agronómicos"] },
  { icon: <IconBell />, title: "Alertas Inteligentes", desc: "Recibe notificaciones automáticas ante condiciones de riesgo para tu cultivo, clasificadas por tipo y urgencia para que puedas actuar a tiempo.", puntos: ["Alertas de estrés hídrico crítico", "Alertas fitosanitarias tempranas", "Recomendaciones agronómicas accionables"] },
  { icon: <IconMap />, title: "Mapeo de Parcelas", desc: "Delimita el perímetro exacto de tus fincas sobre imagen satelital, calcula el área real en hectáreas y administra cada parcela de forma independiente.", puntos: ["Polígonos sobre imagen satelital", "Cálculo preciso del área cultivada", "Gestión multi-finca centralizada"] },
  { icon: <IconBarChart />, title: "Historial y Reportes", desc: "Consulta el historial completo de análisis, capturas y alertas por finca para tomar decisiones agronómicas basadas en datos históricos.", puntos: ["Historial de análisis por IA", "Trazabilidad completa por cultivo", "Exportación de reportes"] },
  { icon: <IconSprout />, title: "Gestión de Cultivos", desc: "Registra y monitorea el estado fenológico de cada cultivo, desde la siembra hasta la cosecha, con control de fechas y ciclos productivos.", puntos: ["Seguimiento del estado fenológico", "Control de fechas de siembra", "Ciclos de producción por cultivo"] },
];

const CONTACTOS = [
  { icon: <IconMail />, label: "Email", value: "contacto@caribebloom.com" },
  { icon: <IconPhone />, label: "Teléfono", value: "+57 300 000 0000" },
  { icon: <IconMapPin />, label: "Ubicación", value: "Barranquilla, Atlántico" },
];

const NAV_ITEMS = [{ label: "Inicio", id: "inicio" }, { label: "Funciones", id: "funciones" }, { label: "Nosotros", id: "nosotros" }, { label: "Contacto", id: "contacto" }];

export default function Landing({ onLoginClick, onRegistroClick }) {
  const [activeSection, setActiveSection] = useState("inicio");
  const [counted, setCounted] = useState(false);
  const [countVals, setCountVals] = useState({ fincas: 0, precision: 0 });
  const [form, setForm] = useState({ nombre: "", correo: "", mensaje: "" });
  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | sent | error
  const statsRef = useRef(null);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const ids = NAV_ITEMS.map(n => n.id);
    const onScroll = () => {
      const scrollPos = window.scrollY + 140;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
          setCounted(true);
          const duration = 1100;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCountVals({ fincas: Math.round(150 * eased), precision: Math.round(98 * eased) });
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [counted]);

  const handleFormChange = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    if (formStatus === "error") setFormStatus("idle");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.correo.trim() || !form.mensaje.trim()) {
      setFormStatus("error");
      return;
    }
    setFormStatus("sending");
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setFormStatus("sent");
      setForm({ nombre: "", correo: "", mensaje: "" });
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", minHeight: "100vh", background: "#fff", overflowX: "hidden" }}>

      <nav className="landing-nav" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 48px",
        background: "rgba(7,31,20,0.85)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, background: "linear-gradient(135deg,#2f9e5c,#12492b)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}><IconLeaf size={20} /></div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>Caribe Bloom</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.8px" }}>AgriMonitor</div>
          </div>
        </div>
        <div className="landing-nav-links" style={{ alignItems: "center", gap: 28 }}>
          {NAV_ITEMS.map(({ label, id }) => {
            const isActive = activeSection === id;
            return (
              <span key={id} onClick={() => scrollTo(id)} style={{ color: isActive ? "#2f9e5c" : "rgba(255,255,255,0.75)", fontSize: 13, fontWeight: isActive ? 700 : 500, cursor: "pointer", transition: "color 0.15s" }}
                onMouseEnter={e => { if (!isActive) e.target.style.color = "#5fb885"; }}
                onMouseLeave={e => { if (!isActive) e.target.style.color = "rgba(255,255,255,0.75)"; }}
              >{label}</span>
            );
          })}
          <button onClick={onLoginClick} style={{ padding: "9px 22px", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.35)", borderRadius: 8, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Iniciar Sesión
          </button>
        </div>
      </nav>

      <div id="inicio" style={{ position: "relative", height: "100vh", overflow: "hidden", background: "linear-gradient(135deg, #071f14 0%, #12492b 45%, #0d3620 75%, #081712 100%)", display: "flex", alignItems: "center" }}>
        <img src={heroImg} alt="finca" className="landing-hero-img" style={{ position: "absolute", right: 0, top: 0, height: "100%", width: "58%", objectFit: "cover", objectPosition: "center", opacity: 0.45, filter: "saturate(0.85) contrast(1.05)", maskImage: "linear-gradient(to right, transparent 0%, black 45%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 45%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #071f14 30%, transparent 65%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(4,15,10,0.65) 0%, transparent 45%)" }} />
        <div className="landing-hero" style={{ position: "relative", zIndex: 2, padding: "0 64px", maxWidth: 660 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(47,158,92,0.2)", border: "1px solid rgba(47,158,92,0.4)", borderRadius: 20, padding: "5px 14px", marginBottom: 26 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#2f9e5c" }} />
            <span style={{ color: "#a3d9b4", fontSize: 11, fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase" }}>Atlántico, Colombia</span>
          </div>
          <h1 className="landing-h1" style={{ fontWeight: 800, color: "#fff", lineHeight: 1.05, letterSpacing: "-1.5px", margin: "0 0 20px" }}>
            Cultiva <span style={{ color: "#2f9e5c" }}>inteligente</span> en el Caribe
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.65, margin: "0 0 36px", maxWidth: 480 }}>
            Monitorea humedad del suelo, temperatura y salud fitosanitaria en tiempo real combinando sensores de campo y análisis satelital NDVI, detectando estrés hídrico y enfermedades antes de que comprometan tu cosecha.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginBottom: 52 }}>
            <button onClick={onRegistroClick} style={{ padding: "14px 32px", background: "#2f9e5c", border: "none", borderRadius: 10, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 20px rgba(47,158,92,0.45)" }}>Comenzar ahora →</button>
            <button onClick={() => scrollTo("funciones")} style={{ padding: "14px 28px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 10, color: "rgba(255,255,255,0.85)", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>Ver demo</button>
          </div>
          <div ref={statsRef} className="landing-stats" style={{ display: "flex", gap: 32, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.12)" }}>
            <div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>{countVals.fincas}+</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 3 }}>Fincas activas</div>
            </div>
            <div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>{countVals.precision}%</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 3 }}>Precisión IA</div>
            </div>
            <div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>24/7</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 3 }}>Monitoreo</div>
            </div>
          </div>
        </div>
      </div>

      <div id="funciones" className="landing-section" style={{ background: "#f4f6f5" }}>
        <div style={{ textAlign: "center", marginBottom: 70 }}>
          <div style={{ fontSize: 11, color: "#248a53", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 10 }}>Funcionalidades</div>
          <h2 style={{ fontSize: 38, fontWeight: 800, color: "#071f14", letterSpacing: "-0.8px", margin: "0 0 16px" }}>Todo lo que necesitas para tu finca</h2>
          <p style={{ fontSize: 15, color: "#4c6b5a", maxWidth: 560, margin: "0 auto" }}>Caribe Bloom integra sensores de campo, teledetección satelital e inteligencia artificial en una sola plataforma, pensada para los retos reales de la agricultura del Caribe colombiano.</p>
        </div>
        <div className="landing-grid-3" style={{ gap: 24, maxWidth: 1100, margin: "0 auto" }}>
          {FEATURES.map(({ icon, title, desc, puntos }) => (
            <div key={title} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 16, padding: "32px 28px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ width: 52, height: 52, background: "linear-gradient(135deg,#e2f0e7,#c3ddc9)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#071f14", marginBottom: 8 }}>{title}</div>
                <div style={{ fontSize: 13, color: "#6a8a76", lineHeight: 1.7 }}>{desc}</div>
              </div>
              <ul style={{ margin: 0, padding: "0 0 0 16px", display: "flex", flexDirection: "column", gap: 6 }}>
                {puntos.map(p => <li key={p} style={{ fontSize: 12, color: "#248a53", fontWeight: 600 }}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="landing-cta-row" style={{ background: "linear-gradient(135deg, #071f14, #12492b)", borderRadius: 20, padding: "48px 56px", maxWidth: 1100, margin: "80px auto 0" }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Tecnología que entiende tu campo</div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", maxWidth: 480 }}>Más de 150 fincas en el Atlántico ya usan Caribe Bloom para tomar mejores decisiones agrícolas cada día.</div>
          </div>
          <button onClick={onLoginClick} style={{ padding: "14px 32px", background: "#2f9e5c", border: "none", borderRadius: 10, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, boxShadow: "0 4px 20px rgba(47,158,92,0.4)" }}>
            Comenzar gratis →
          </button>
        </div>
      </div>

      {/* ── NOSOTROS ── */}
      <div id="nosotros" className="landing-section" style={{ background: "#fff", position: "relative", overflow: "hidden" }}>

        {/* Decoración de fondo sutil */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(47,158,92,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(7,31,20,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* Encabezado */}
        <div style={{ textAlign: "center", marginBottom: 70, position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 11, color: "#248a53", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 10 }}>Quiénes somos</div>
          <h2 style={{ fontSize: 38, fontWeight: 800, color: "#071f14", letterSpacing: "-0.8px", margin: "0 0 16px" }}>Nuestra Esencia</h2>
          <p style={{ fontSize: 15, color: "#4c6b5a", maxWidth: 520, margin: "0 auto", lineHeight: 1.65 }}>Un equipo comprometido con llevar la agricultura de precisión al corazón del Caribe colombiano, donde el campo enfrenta retos crecientes de clima, plagas y mercado.</p>
        </div>

        {/* Misión y Visión */}
        <div className="landing-grid-2" style={{ gap: 28, maxWidth: 1000, margin: "0 auto 64px", position: "relative", zIndex: 1 }}>

          {/* Misión */}
          <div style={{ background: "#f4f6f5", borderRadius: 20, padding: "44px 40px", position: "relative", overflow: "hidden", border: "1px solid rgba(47,158,92,0.15)" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 4, background: "linear-gradient(90deg, #2f9e5c, #248a53)" }} />
            <div style={{ width: 52, height: 52, background: "linear-gradient(135deg, #2f9e5c, #12492b)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><path d="M12 8l4 4-4 4M8 12h8" />
              </svg>
            </div>
            <div style={{ fontSize: 11, color: "#248a53", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 12 }}>Nuestra Misión</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: "#071f14", marginBottom: 14, lineHeight: 1.45, fontStyle: "italic" }}>"Empoderar a los agricultores mediante tecnología accesible para transformar el campo."</div>
            <p style={{ fontSize: 13.5, color: "#4c6b5a", lineHeight: 1.8, margin: 0 }}>En Caribe Bloom, democratizamos el acceso a la agricultura de precisión con inteligencia artificial, visión computacional y datos satelitales, en un sector que representa cerca del 10 % del PIB colombiano.</p>
          </div>

          {/* Visión */}
          <div style={{ background: "linear-gradient(145deg, #071f14 0%, #124a2c 100%)", borderRadius: 20, padding: "44px 40px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(47,158,92,0.08)", pointerEvents: "none" }} />
            <div style={{ width: 52, height: 52, background: "rgba(47,158,92,0.2)", border: "1px solid rgba(47,158,92,0.4)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2f9e5c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="2" /><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </div>
            <div style={{ fontSize: 11, color: "#2f9e5c", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 12 }}>Nuestra Visión</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 14, lineHeight: 1.45, fontStyle: "italic" }}>"Ser el referente global en la evolución hacia una agricultura inteligente, predictiva y sostenible."</div>
            <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.8, margin: 0 }}>Aspiramos a consolidarnos como la plataforma líder en el monitoreo agrícola automatizado a nivel nacional e internacional.</p>
          </div>
        </div>

        {/* Valores Fundamentales */}
        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h3 style={{ fontSize: 26, fontWeight: 800, color: "#071f14", margin: "0 0 10px" }}>Nuestros Valores Fundamentales</h3>
            <div style={{ width: 48, height: 3, background: "linear-gradient(90deg, #2f9e5c, #248a53)", borderRadius: 2, margin: "0 auto" }} />
          </div>
          <div className="landing-grid-3" style={{ gap: 20, marginBottom: 20 }}>
            {[
              {
                title: "Innovación con Propósito",
                desc: "Tecnología de vanguardia para resolver problemas reales del sector agrícola.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2f9e5c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17H8v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
                  </svg>
                )
              },
              {
                title: "Sostenibilidad Socio-Ambiental",
                desc: "Prácticas agrícolas que optimizan el uso del agua y los recursos naturales.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2f9e5c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 22c1.25-1.25 2.5-2.5 3.75-2.5S8 20.75 9.25 22c1.25-1.25 2.5-2.5 3.75-2.5S15.5 20.75 16.75 22c1.25-1.25 2.5-2.5 3.75-2.5S23 20.75 24 22" /><path d="M12 2a5 5 0 0 0-5 5c0 5 5 11 5 11s5-6 5-11a5 5 0 0 0-5-5z" />
                  </svg>
                )
              },
              {
                title: "Accesibilidad e Inclusión",
                desc: "Soluciones intuitivas al alcance de agricultores con limitaciones tecnológicas.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2f9e5c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" />
                  </svg>
                )
              },
            ].map(({ title, desc, icon }) => (
              <div key={title} style={{ background: "#f4f6f5", border: "1px solid rgba(47,158,92,0.12)", borderRadius: 16, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ width: 46, height: 46, background: "rgba(47,158,92,0.1)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#071f14" }}>{title}</div>
                <div style={{ fontSize: 12.5, color: "#6a8a76", lineHeight: 1.7 }}>{desc}</div>
              </div>
            ))}
          </div>
          {/* Fila inferior: 2 valores centrados */}
          <div className="landing-grid-2" style={{ gap: 20 }}>
            {[
              {
                title: "Precisión y Confiabilidad",
                desc: "Datos exactos y en tiempo real para tomar las mejores decisiones agronómicas.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2f9e5c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                )
              },
              {
                title: "Compromiso Regional",
                desc: "Nacimos para impulsar el potencial agrícola del Caribe colombiano.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2f9e5c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                )
              },
            ].map(({ title, desc, icon }) => (
              <div key={title} style={{ background: "#f4f6f5", border: "1px solid rgba(47,158,92,0.12)", borderRadius: 16, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ width: 46, height: 46, background: "rgba(47,158,92,0.1)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#071f14" }}>{title}</div>
                <div style={{ fontSize: 12.5, color: "#6a8a76", lineHeight: 1.7 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div id="contacto" className="landing-section" style={{ background: "#f4f6f5" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ fontSize: 11, color: "#248a53", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 10 }}>Contacto</div>
          <h2 style={{ fontSize: 34, fontWeight: 800, color: "#071f14", letterSpacing: "-0.8px", margin: "0 0 14px" }}>¿Tienes alguna pregunta?</h2>
          <p style={{ fontSize: 15, color: "#4c6b5a", margin: 0 }}>Estamos aquí para ayudarte. Escríbenos y te responderemos pronto.</p>
        </div>
        <div style={{ maxWidth: 560, margin: "0 auto", background: "#fff", borderRadius: 16, padding: "40px 36px", boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}>
          {formStatus === "sent" ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(47,158,92,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#248a53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#071f14", marginBottom: 6 }}>¡Mensaje enviado!</div>
              <p style={{ fontSize: 13, color: "#4c6b5a", marginBottom: 20 }}>Gracias por escribirnos, te responderemos pronto.</p>
              <span onClick={() => setFormStatus("idle")} style={{ fontSize: 12, color: "#248a53", fontWeight: 700, cursor: "pointer" }}>Enviar otro mensaje</span>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <div style={{ marginBottom: 18 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#071f14", display: "block", marginBottom: 6 }}>Nombre completo</label>
                <input type="text" placeholder="Tu nombre" value={form.nombre} onChange={handleFormChange("nombre")} style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid #d8e8dc", fontSize: 13, outline: "none", boxSizing: "border-box", background: "#f4f6f5" }} />
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#071f14", display: "block", marginBottom: 6 }}>Correo electrónico</label>
                <input type="email" placeholder="tu@correo.com" value={form.correo} onChange={handleFormChange("correo")} style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid #d8e8dc", fontSize: 13, outline: "none", boxSizing: "border-box", background: "#f4f6f5" }} />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#071f14", display: "block", marginBottom: 6 }}>Mensaje</label>
                <textarea placeholder="¿En qué podemos ayudarte?" rows={4} value={form.mensaje} onChange={handleFormChange("mensaje")} style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid #d8e8dc", fontSize: 13, outline: "none", boxSizing: "border-box", background: "#f4f6f5", resize: "vertical" }} />
              </div>
              {formStatus === "error" && (
                <div style={{ fontSize: 12, color: "#c62828", marginBottom: 14 }}>Completa todos los campos correctamente, o intenta de nuevo en unos segundos.</div>
              )}
              <button type="submit" disabled={formStatus === "sending"} style={{ width: "100%", padding: "13px", marginTop: 12, background: formStatus === "sending" ? "#6a8a76" : "#2f9e5c", border: "none", borderRadius: 8, color: "#fff", fontSize: 14, fontWeight: 700, cursor: formStatus === "sending" ? "not-allowed" : "pointer" }}>
                {formStatus === "sending" ? "Enviando..." : "Enviar mensaje →"}
              </button>
            </form>
          )}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 48, marginTop: 52 }}>
          {CONTACTOS.map(({ icon, label, value }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(47,158,92,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>{icon}</div>
              <div style={{ fontSize: 11, color: "#248a53", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 13, color: "#4c6b5a" }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="landing-section" style={{ textAlign: "center", background: "linear-gradient(135deg, #071f14, #12492b)" }}>
        <h2 style={{ fontSize: 34, fontWeight: 800, color: "#fff", letterSpacing: "-0.8px", margin: "0 0 14px" }}>¿Listo para transformar tu finca?</h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, marginBottom: 32 }}>Únete a los agricultores del Atlántico que ya monitorizan con Caribe Bloom.</p>
        <button onClick={onRegistroClick} style={{ padding: "15px 40px", background: "#2f9e5c", border: "none", borderRadius: 10, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 20px rgba(47,158,92,0.4)" }}>
          Acceder a la plataforma →
        </button>
      </div>

    </div>
  );
}