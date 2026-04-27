import heroImg from "../assets/hero.png";

export default function Landing({ onLoginClick }) {
  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", minHeight: "100vh", background: "#fff", overflowX: "hidden" }}>

      {/* NAVBAR */}
      <nav style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 10,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 48px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 38, height: 38,
            background: "linear-gradient(135deg,#3db866,#1e7a40)",
            borderRadius: 10, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 20,
          }}>🌿</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>Caribe Bloom</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.8px" }}>AgriMonitor</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {["Inicio", "Funciones", "Nosotros", "Contacto"].map(l => (
            <span key={l} style={{
              color: "rgba(255,255,255,0.75)", fontSize: 13, fontWeight: 500, cursor: "pointer",
            }}>{l}</span>
          ))}
          <button onClick={onLoginClick} style={{
            padding: "9px 22px",
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.35)",
            borderRadius: 8, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}>
            Iniciar Sesión
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{
        position: "relative", height: "100vh", overflow: "hidden",
        background: "linear-gradient(135deg, #0a3d1f 0%, #1e7a40 45%, #145a2e 75%, #0f2d1a 100%)",
        display: "flex", alignItems: "center",
      }}>
        <img src={heroImg} alt="finca" style={{
          position: "absolute", right: 0, top: 0,
          height: "100%", width: "55%",
          objectFit: "cover", objectPosition: "center",
          opacity: 0.35,
          maskImage: "linear-gradient(to right, transparent 0%, black 40%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 40%)",
        }} />

        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, #0a3d1f 35%, transparent 70%)",
        }} />

        <div style={{
          position: "absolute", right: "-80px", top: "-80px",
          width: 480, height: 480, borderRadius: "50%",
          border: "1px solid rgba(61,184,102,0.15)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", right: "60px", top: "60px",
          width: 300, height: 300, borderRadius: "50%",
          border: "1px solid rgba(61,184,102,0.1)", pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 2, padding: "0 64px", maxWidth: 660 }}>

          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: "rgba(61,184,102,0.2)", border: "1px solid rgba(61,184,102,0.4)",
            borderRadius: 20, padding: "5px 14px", marginBottom: 26,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#3db866" }} />
            <span style={{ color: "#a8e6bc", fontSize: 11, fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase" }}>
              Atlántico, Colombia
            </span>
          </div>

          <h1 style={{
            fontSize: 56, fontWeight: 800, color: "#fff",
            lineHeight: 1.05, letterSpacing: "-1.5px", margin: "0 0 20px",
          }}>
            Cultiva{" "}
            <span style={{ color: "#3db866" }}>inteligente</span>
            {" "}en el Caribe
          </h1>

          <p style={{
            fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.65,
            margin: "0 0 36px", maxWidth: 480,
          }}>
            Monitorea tus fincas en tiempo real con análisis satelital,
            detección de enfermedades y alertas automáticas para tus cultivos.
          </p>

          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 52 }}>
            <button onClick={onLoginClick} style={{
              padding: "14px 32px", background: "#3db866",
              border: "none", borderRadius: 10, color: "#fff",
              fontSize: 15, fontWeight: 700, cursor: "pointer",
              boxShadow: "0 4px 20px rgba(61,184,102,0.45)",
            }}>
              Comenzar ahora →
            </button>
            <button style={{
              padding: "14px 28px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: 10, color: "rgba(255,255,255,0.85)",
              fontSize: 14, fontWeight: 500, cursor: "pointer",
            }}>
              Ver demo
            </button>
          </div>

          <div style={{
            display: "flex", gap: 32,
            paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.12)",
          }}>
            {[["150+", "Fincas activas"], ["98%", "Precisión IA"], ["24/7", "Monitoreo"]].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontSize: 26, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>{val}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 3 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FUNCIONALIDADES */}
      <div style={{ padding: "80px 64px", background: "#f4f6f5" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ fontSize: 11, color: "#2d9e4f", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 10 }}>
            Funcionalidades
          </div>
          <h2 style={{ fontSize: 34, fontWeight: 800, color: "#0a3d1f", letterSpacing: "-0.8px", margin: 0 }}>
            Todo lo que necesitas para tu finca
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, maxWidth: 900, margin: "0 auto" }}>
          {[
            { icon: "🛰️", title: "Análisis Satelital",   desc: "Imágenes NDVI en tiempo real para detectar estrés hídrico y cambios en tus cultivos." },
            { icon: "🤖", title: "IA Agrícola",          desc: "Detección automática de enfermedades y deficiencias nutricionales con alta precisión." },
            { icon: "🔔", title: "Alertas Inteligentes", desc: "Notificaciones instantáneas sobre riego, fitosanitarios y condiciones climáticas." },
            { icon: "🗺️", title: "Mapeo de Parcelas",    desc: "Visualización geográfica de todas tus fincas con datos agronómicos en tiempo real." },
            { icon: "📊", title: "Historial y Reportes", desc: "Seguimiento histórico de análisis, cosechas y rendimiento por parcela." },
            { icon: "🌱", title: "Gestión de Cultivos",  desc: "Control del estado fenológico, fechas de siembra y ciclos de producción." },
          ].map(({ icon, title, desc }) => (
            <div key={title} style={{
              background: "#fff", border: "1px solid rgba(0,0,0,0.07)",
              borderRadius: 12, padding: "24px 22px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0a3d1f", marginBottom: 7 }}>{title}</div>
              <div style={{ fontSize: 12, color: "#7a9e87", lineHeight: 1.65 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
            {/* MISIÓN, VISIÓN Y VALORES */}
      <div style={{ padding: "80px 64px", background: "#fff" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontSize: 11, color: "#2d9e4f", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 10 }}>
            Quiénes somos
          </div>
          <h2 style={{ fontSize: 34, fontWeight: 800, color: "#0a3d1f", letterSpacing: "-0.8px", margin: 0 }}>
            Nuestra Esencia
          </h2>
        </div>

        {/* Misión y Visión */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 900, margin: "0 auto 60px" }}>
          <div style={{ background: "#f4f6f5", borderRadius: 16, padding: "36px 32px" }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>🎯</div>
            <div style={{ fontSize: 11, color: "#2d9e4f", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>Nuestra Misión</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#0a3d1f", marginBottom: 12, fontStyle: "italic" }}>
              "Empoderar a los agricultores mediante tecnología accesible para transformar el campo."
            </div>
            <p style={{ fontSize: 13, color: "#5a7a66", lineHeight: 1.75, margin: 0 }}>
              En Bloom Caribe, democratizamos el acceso a la agricultura de precisión. Proveemos un sistema inteligente y accesible de monitoreo agrícola que fusiona inteligencia artificial, visión computacional y datos satelitales. Nuestra misión es entregar a los agricultores diagnósticos precisos, alertas tempranas y recomendaciones agronómicas directamente en sus manos.
            </p>
          </div>

          <div style={{ background: "#0a3d1f", borderRadius: 16, padding: "36px 32px" }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>🌍</div>
            <div style={{ fontSize: 11, color: "#3db866", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>Nuestra Visión</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 12, fontStyle: "italic" }}>
              "Ser el referente global en la evolución hacia una agricultura inteligente, predictiva y sostenible."
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, margin: 0 }}>
              Aspiramos a consolidarnos como la plataforma líder en el monitoreo agrícola automatizado a nivel nacional e internacional, evolucionando hacia la automatización total con drones, maquinaria inteligente y modelos predictivos avanzados.
            </p>
          </div>
        </div>

        {/* Valores */}
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: "#0a3d1f", textAlign: "center", marginBottom: 32 }}>
            Nuestros Valores Fundamentales
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
            {[
              { icon: "💡", title: "Innovación con Propósito", desc: "Utilizamos tecnología de vanguardia (IA, Machine Learning y análisis satelital) no solo por innovar, sino para resolver problemas reales y urgentes del sector agrícola." },
              { icon: "🌿", title: "Sostenibilidad Socio-Ambiental", desc: "Promovemos prácticas agrícolas que cuiden nuestro planeta, ayudando a optimizar el uso del agua y los recursos con impacto positivo en el medio ambiente y las comunidades rurales." },
              { icon: "📱", title: "Accesibilidad e Inclusión", desc: "Diseñamos soluciones intuitivas al alcance de agricultores en regiones con limitaciones tecnológicas, transformando su teléfono móvil en su mejor herramienta de trabajo." },
              { icon: "📡", title: "Precisión y Confiabilidad", desc: "Nuestro compromiso es entregar datos exactos y en tiempo real. Una decisión basada en información precisa a tiempo marca la diferencia entre una pérdida y una cosecha exitosa." },
              { icon: "🌴", title: "Compromiso Regional", desc: "Nacimos para impulsar el potencial del Caribe colombiano, entendiendo sus necesidades únicas para luego escalar nuestras soluciones al resto del mundo.", style: { gridColumn: "1 / -1" } },
            ].map(({ icon, title, desc, style: extraStyle }) => (
              <div key={title} style={{
                background: "#f4f6f5", borderRadius: 12, padding: "24px 22px",
                borderLeft: "4px solid #3db866", ...extraStyle,
              }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0a3d1f", marginBottom: 6 }}>{title}</div>
                <div style={{ fontSize: 12, color: "#7a9e87", lineHeight: 1.65 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* CTA FINAL */}
      <div style={{
        padding: "72px 64px", textAlign: "center",
        background: "linear-gradient(135deg, #0a3d1f, #1e7a40)",
      }}>
        <h2 style={{ fontSize: 34, fontWeight: 800, color: "#fff", letterSpacing: "-0.8px", margin: "0 0 14px" }}>
          ¿Listo para transformar tu finca?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, marginBottom: 32 }}>
          Únete a los agricultores del Atlántico que ya monitorizan con Caribe Bloom.
        </p>
        <button onClick={onLoginClick} style={{
          padding: "15px 40px", background: "#3db866",
          border: "none", borderRadius: 10, color: "#fff",
          fontSize: 15, fontWeight: 700, cursor: "pointer",
          boxShadow: "0 4px 20px rgba(61,184,102,0.4)",
        }}>
          Acceder a la plataforma →
        </button>
      </div>

    </div>
  );
}