import heroImg from "../assets/hero.png";

export default function Landing({ onLoginClick }) {

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", minHeight: "100vh", background: "#fff", overflowX: "hidden" }}>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 48px",
        background: "rgba(10,61,31,0.85)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, background: "linear-gradient(135deg,#3db866,#1e7a40)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🌿</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>Caribe Bloom</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.8px" }}>AgriMonitor</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {[{ label: "Inicio", id: "inicio" }, { label: "Funciones", id: "funciones" }, { label: "Nosotros", id: "nosotros" }, { label: "Contacto", id: "contacto" }].map(({ label, id }) => (
            <span key={id} onClick={() => scrollTo(id)} style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, fontWeight: 500, cursor: "pointer" }}
              onMouseEnter={e => e.target.style.color = "#3db866"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.75)"}
            >{label}</span>
          ))}
          <button onClick={onLoginClick} style={{ padding: "9px 22px", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.35)", borderRadius: 8, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Iniciar Sesión
          </button>
        </div>
      </nav>

      <div id="inicio" style={{ position: "relative", height: "100vh", overflow: "hidden", background: "linear-gradient(135deg, #0a3d1f 0%, #1e7a40 45%, #145a2e 75%, #0f2d1a 100%)", display: "flex", alignItems: "center" }}>
        <img src={heroImg} alt="finca" style={{ position: "absolute", right: 0, top: 0, height: "100%", width: "55%", objectFit: "cover", objectPosition: "center", opacity: 0.35, maskImage: "linear-gradient(to right, transparent 0%, black 40%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 40%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #0a3d1f 35%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "0 64px", maxWidth: 660 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(61,184,102,0.2)", border: "1px solid rgba(61,184,102,0.4)", borderRadius: 20, padding: "5px 14px", marginBottom: 26 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#3db866" }} />
            <span style={{ color: "#a8e6bc", fontSize: 11, fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase" }}>Atlántico, Colombia</span>
          </div>
          <h1 style={{ fontSize: 56, fontWeight: 800, color: "#fff", lineHeight: 1.05, letterSpacing: "-1.5px", margin: "0 0 20px" }}>
            Cultiva <span style={{ color: "#3db866" }}>inteligente</span> en el Caribe
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.65, margin: "0 0 36px", maxWidth: 480 }}>
            Monitorea tus fincas en tiempo real con análisis satelital, detección de enfermedades y alertas automáticas para tus cultivos.
          </p>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 52 }}>
            <button onClick={onLoginClick} style={{ padding: "14px 32px", background: "#3db866", border: "none", borderRadius: 10, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 20px rgba(61,184,102,0.45)" }}>Comenzar ahora →</button>
            <button onClick={() => scrollTo("funciones")} style={{ padding: "14px 28px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 10, color: "rgba(255,255,255,0.85)", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>Ver demo</button>
          </div>
          <div style={{ display: "flex", gap: 32, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.12)" }}>
            {[["150+", "Fincas activas"], ["98%", "Precisión IA"], ["24/7", "Monitoreo"]].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontSize: 26, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>{val}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 3 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="funciones" style={{ padding: "100px 64px", background: "#f4f6f5" }}>
        <div style={{ textAlign: "center", marginBottom: 70 }}>
          <div style={{ fontSize: 11, color: "#2d9e4f", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 10 }}>Funcionalidades</div>
          <h2 style={{ fontSize: 38, fontWeight: 800, color: "#0a3d1f", letterSpacing: "-0.8px", margin: "0 0 16px" }}>Todo lo que necesitas para tu finca</h2>
          <p style={{ fontSize: 15, color: "#5a7a66", maxWidth: 560, margin: "0 auto" }}>Caribe Bloom integra tecnología satelital, inteligencia artificial y monitoreo en tiempo real en una sola plataforma.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, maxWidth: 1100, margin: "0 auto" }}>
          {[
            { icon: "🛰️", title: "Análisis Satelital", desc: "Accede a imágenes NDVI actualizadas de tus cultivos desde el espacio. Detecta estrés hídrico y cambios de vegetación antes de que sean visibles.", puntos: ["Índice NDVI en tiempo real", "Detección de estrés hídrico", "Cobertura completa de parcelas"] },
            { icon: "🤖", title: "IA Agrícola", desc: "Nuestro motor de inteligencia artificial analiza imágenes de tus cultivos para detectar enfermedades, plagas y deficiencias nutricionales.", puntos: ["Detección de enfermedades", "Análisis de deficiencias", "Confianza del modelo > 90%"] },
            { icon: "🔔", title: "Alertas Inteligentes", desc: "Recibe notificaciones instantáneas cuando tus cultivos necesiten atención. Alertas clasificadas por tipo y urgencia para actuar a tiempo.", puntos: ["Alertas fitosanitarias", "Alertas de riego crítico", "Recomendaciones agronómicas"] },
            { icon: "🗺️", title: "Mapeo de Parcelas", desc: "Delimita y visualiza el perímetro exacto de tus fincas sobre imagen satelital. Conoce el área real en hectáreas y gestiona cada parcela.", puntos: ["Polígonos sobre satélite", "Cálculo de área real", "Gestión multi-finca"] },
            { icon: "📊", title: "Historial y Reportes", desc: "Consulta el historial completo de análisis, capturas y alertas por finca. Toma decisiones basadas en datos históricos.", puntos: ["Historial de análisis IA", "Trazabilidad por cultivo", "Exportación de reportes"] },
            { icon: "🌱", title: "Gestión de Cultivos", desc: "Registra y monitorea el estado fenológico de cada cultivo, desde la siembra hasta la cosecha. Controla fechas y ciclos.", puntos: ["Estado fenológico", "Control de siembra", "Ciclos de producción"] },
          ].map(({ icon, title, desc, puntos }) => (
            <div key={title} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 16, padding: "32px 28px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ width: 52, height: 52, background: "linear-gradient(135deg,#e8f5ee,#c8ead4)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{icon}</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#0a3d1f", marginBottom: 8 }}>{title}</div>
                <div style={{ fontSize: 13, color: "#7a9e87", lineHeight: 1.7 }}>{desc}</div>
              </div>
              <ul style={{ margin: 0, padding: "0 0 0 16px", display: "flex", flexDirection: "column", gap: 6 }}>
                {puntos.map(p => <li key={p} style={{ fontSize: 12, color: "#2d9e4f", fontWeight: 600 }}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 80, background: "linear-gradient(135deg, #0a3d1f, #1e7a40)", borderRadius: 20, padding: "48px 56px", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1100, margin: "80px auto 0" }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Tecnología que entiende tu campo</div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", maxWidth: 480 }}>Más de 150 fincas en el Atlántico ya usan Caribe Bloom para tomar mejores decisiones agrícolas cada día.</div>
          </div>
          <button onClick={onLoginClick} style={{ padding: "14px 32px", background: "#3db866", border: "none", borderRadius: 10, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, boxShadow: "0 4px 20px rgba(61,184,102,0.4)" }}>
            Comenzar gratis →
          </button>
        </div>
      </div>

      {/* ── NOSOTROS ── */}
      <div id="nosotros" style={{ padding: "100px 64px", background: "#fff", position: "relative", overflow: "hidden" }}>

        {/* Decoración de fondo sutil */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(61,184,102,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(10,61,31,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* Encabezado */}
        <div style={{ textAlign: "center", marginBottom: 70, position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 11, color: "#2d9e4f", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 10 }}>Quiénes somos</div>
          <h2 style={{ fontSize: 38, fontWeight: 800, color: "#0a3d1f", letterSpacing: "-0.8px", margin: "0 0 16px" }}>Nuestra Esencia</h2>
          <p style={{ fontSize: 15, color: "#5a7a66", maxWidth: 520, margin: "0 auto", lineHeight: 1.65 }}>Un equipo comprometido con llevar la tecnología agrícola de precisión al corazón del Caribe colombiano.</p>
        </div>

        {/* Misión y Visión */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, maxWidth: 1000, margin: "0 auto 64px", position: "relative", zIndex: 1 }}>

          {/* Misión */}
          <div style={{ background: "#f4f6f5", borderRadius: 20, padding: "44px 40px", position: "relative", overflow: "hidden", border: "1px solid rgba(61,184,102,0.15)" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 4, background: "linear-gradient(90deg, #3db866, #2d9e4f)" }} />
            <div style={{ width: 52, height: 52, background: "linear-gradient(135deg, #3db866, #1e7a40)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 8l4 4-4 4M8 12h8"/>
              </svg>
            </div>
            <div style={{ fontSize: 11, color: "#2d9e4f", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 12 }}>Nuestra Misión</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: "#0a3d1f", marginBottom: 14, lineHeight: 1.45, fontStyle: "italic" }}>"Empoderar a los agricultores mediante tecnología accesible para transformar el campo."</div>
            <p style={{ fontSize: 13.5, color: "#5a7a66", lineHeight: 1.8, margin: 0 }}>En Caribe Bloom, democratizamos el acceso a la agricultura de precisión con inteligencia artificial, visión computacional y datos satelitales.</p>
          </div>

          {/* Visión */}
          <div style={{ background: "linear-gradient(145deg, #0a3d1f 0%, #1a6335 100%)", borderRadius: 20, padding: "44px 40px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(61,184,102,0.08)", pointerEvents: "none" }} />
            <div style={{ width: 52, height: 52, background: "rgba(61,184,102,0.2)", border: "1px solid rgba(61,184,102,0.4)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#3db866" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="2"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
            </div>
            <div style={{ fontSize: 11, color: "#3db866", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 12 }}>Nuestra Visión</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 14, lineHeight: 1.45, fontStyle: "italic" }}>"Ser el referente global en la evolución hacia una agricultura inteligente, predictiva y sostenible."</div>
            <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.8, margin: 0 }}>Aspiramos a consolidarnos como la plataforma líder en el monitoreo agrícola automatizado a nivel nacional e internacional.</p>
          </div>
        </div>

        {/* Valores Fundamentales */}
        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h3 style={{ fontSize: 26, fontWeight: 800, color: "#0a3d1f", margin: "0 0 10px" }}>Nuestros Valores Fundamentales</h3>
            <div style={{ width: 48, height: 3, background: "linear-gradient(90deg, #3db866, #2d9e4f)", borderRadius: 2, margin: "0 auto" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 20 }}>
            {[
              {
                title: "Innovación con Propósito",
                desc: "Tecnología de vanguardia para resolver problemas reales del sector agrícola.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3db866" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17H8v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/>
                  </svg>
                )
              },
              {
                title: "Sostenibilidad Socio-Ambiental",
                desc: "Prácticas agrícolas que optimizan el uso del agua y los recursos naturales.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3db866" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 22c1.25-1.25 2.5-2.5 3.75-2.5S8 20.75 9.25 22c1.25-1.25 2.5-2.5 3.75-2.5S15.5 20.75 16.75 22c1.25-1.25 2.5-2.5 3.75-2.5S23 20.75 24 22"/><path d="M12 2a5 5 0 0 0-5 5c0 5 5 11 5 11s5-6 5-11a5 5 0 0 0-5-5z"/>
                  </svg>
                )
              },
              {
                title: "Accesibilidad e Inclusión",
                desc: "Soluciones intuitivas al alcance de agricultores con limitaciones tecnológicas.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3db866" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>
                  </svg>
                )
              },
            ].map(({ title, desc, icon }) => (
              <div key={title} style={{ background: "#f4f6f5", border: "1px solid rgba(61,184,102,0.12)", borderRadius: 16, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ width: 46, height: 46, background: "rgba(61,184,102,0.1)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0a3d1f" }}>{title}</div>
                <div style={{ fontSize: 12.5, color: "#7a9e87", lineHeight: 1.7 }}>{desc}</div>
              </div>
            ))}
          </div>
          {/* Fila inferior: 2 valores centrados */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {[
              {
                title: "Precisión y Confiabilidad",
                desc: "Datos exactos y en tiempo real para tomar las mejores decisiones agronómicas.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3db866" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                )
              },
              {
                title: "Compromiso Regional",
                desc: "Nacimos para impulsar el potencial agrícola del Caribe colombiano.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3db866" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                )
              },
            ].map(({ title, desc, icon }) => (
              <div key={title} style={{ background: "#f4f6f5", border: "1px solid rgba(61,184,102,0.12)", borderRadius: 16, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ width: 46, height: 46, background: "rgba(61,184,102,0.1)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0a3d1f" }}>{title}</div>
                <div style={{ fontSize: 12.5, color: "#7a9e87", lineHeight: 1.7 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div id="contacto" style={{ padding: "100px 64px", background: "#f4f6f5" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ fontSize: 11, color: "#2d9e4f", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 10 }}>Contacto</div>
          <h2 style={{ fontSize: 34, fontWeight: 800, color: "#0a3d1f", letterSpacing: "-0.8px", margin: "0 0 14px" }}>¿Tienes alguna pregunta?</h2>
          <p style={{ fontSize: 15, color: "#5a7a66", margin: 0 }}>Estamos aquí para ayudarte. Escríbenos y te responderemos pronto.</p>
        </div>
        <div style={{ maxWidth: 560, margin: "0 auto", background: "#fff", borderRadius: 16, padding: "40px 36px", boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}>
          {[{ label: "Nombre completo", placeholder: "Tu nombre", type: "text" }, { label: "Correo electrónico", placeholder: "tu@correo.com", type: "email" }].map(({ label, placeholder, type }) => (
            <div key={label} style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#0a3d1f", display: "block", marginBottom: 6 }}>{label}</label>
              <input type={type} placeholder={placeholder} style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid #d8e8dc", fontSize: 13, outline: "none", boxSizing: "border-box", background: "#f4f6f5" }} />
            </div>
          ))}
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#0a3d1f", display: "block", marginBottom: 6 }}>Mensaje</label>
            <textarea placeholder="¿En qué podemos ayudarte?" rows={4} style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid #d8e8dc", fontSize: 13, outline: "none", boxSizing: "border-box", background: "#f4f6f5", resize: "vertical" }} />
          </div>
          <button style={{ width: "100%", padding: "13px", background: "#3db866", border: "none", borderRadius: 8, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Enviar mensaje →</button>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 48, marginTop: 52 }}>
          {[{ icon: "📧", label: "Email", value: "contacto@caribebloom.com" }, { icon: "📞", label: "Teléfono", value: "+57 300 000 0000" }, { icon: "📍", label: "Ubicación", value: "Barranquilla, Atlántico" }].map(({ icon, label, value }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
              <div style={{ fontSize: 11, color: "#2d9e4f", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 13, color: "#5a7a66" }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "72px 64px", textAlign: "center", background: "linear-gradient(135deg, #0a3d1f, #1e7a40)" }}>
        <h2 style={{ fontSize: 34, fontWeight: 800, color: "#fff", letterSpacing: "-0.8px", margin: "0 0 14px" }}>¿Listo para transformar tu finca?</h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, marginBottom: 32 }}>Únete a los agricultores del Atlántico que ya monitorizan con Caribe Bloom.</p>
        <button onClick={onLoginClick} style={{ padding: "15px 40px", background: "#3db866", border: "none", borderRadius: 10, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 20px rgba(61,184,102,0.4)" }}>
          Acceder a la plataforma →
        </button>
      </div>

    </div>
  );
}