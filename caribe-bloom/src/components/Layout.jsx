import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

const NAV = [
  { to: "/",            label: "Dashboard",         icon: "⊞" },
  { to: "/parcelas",    label: "Mis Parcelas",       icon: "◈" },
  { to: "/satelite",    label: "Análisis Satelital", icon: "◎" },
  { to: "/historial",   label: "Historial",          icon: "⊙" },
  { to: "/alertas",     label: "Alertas",            icon: "△" },
  
];

const navStyle = ({ isActive }) => ({
  display: "flex", alignItems: "center", gap: 10,
  padding: "10px 12px", borderRadius: 8, marginBottom: 3,
  textDecoration: "none", fontSize: 13, transition: "all 0.15s",
  background: isActive ? "rgba(47,158,92,0.2)" : "transparent",
  color: isActive ? "#6bcf8e" : "rgba(255,255,255,0.55)",
  fontWeight: isActive ? 600 : 400,
  borderLeft: isActive ? "3px solid #2f9e5c" : "3px solid transparent",
});

export default function Layout({ user, onLogout }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app">
      <div className={`sidebar-overlay${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(false)} />
      <aside className={`sidebar${menuOpen ? " open" : ""}`} style={{
        width: 220, background: "#081712",
        borderRight: "none", display: "flex",
        flexDirection: "column", flexShrink: 0
      }}>
        {/* Logo */}
        <div style={{ padding: "22px 18px 18px", display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{
            width: 38, height: 38,
            background: "linear-gradient(135deg,#2f9e5c,#12492b)",
            borderRadius: 10, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 20
          }}>🌿</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Caribe Bloom</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.5px" }}>AgriMonitor</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: "8px 10px", flex: 1 }}>
          {NAV.map(({ to, label, icon }) => (
            <NavLink key={to} to={to} end={to === "/"} style={navStyle}>
              <span style={{ fontSize: 15 }}>{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>
        {/* Configuracion */}
        <div style={{ padding: "0 10px 8px" }}>
          <NavLink to="/configuracion" style={navStyle}>
            <span style={{ fontSize: 15 }}>⚙</span> Configuración
          </NavLink>
        </div>
        {/* User footer */}
        <div style={{
          padding: "14px 16px", borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex", alignItems: "center", gap: 10
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "linear-gradient(135deg,#2f9e5c,#12492b)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0
          }}>
            {user?.nombre?.slice(0, 2).toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.nombre}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{user?.rol}</div>
          </div>
          <button onClick={() => { onLogout(); navigate("/"); }}
            style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: 16, padding: 4 }}>
            ⇥
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="main">
        <header style={{
          height: 56, background: "#fff", borderBottom: "1px solid var(--border)",
          display: "flex", alignItems: "center", padding: "0 24px", gap: 14,
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
        }}>
          <button className="menu-toggle" onClick={() => setMenuOpen(true)} style={{
            background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "var(--text2)", padding: 4
          }}>☰</button>
          <input className="header-search" placeholder="Buscar parcelas, cultivos..." style={{
            flex: 1, maxWidth: 280, background: "#f4f6f5",
            border: "1px solid var(--border2)", borderRadius: 20,
            padding: "7px 16px", fontSize: 12, color: "var(--text2)", outline: "none"
          }} />
          <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{
              width: 34, height: 34, background: "#f4f6f5",
              border: "1px solid var(--border)", borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 15, cursor: "pointer"
            }} onClick={() => navigate("/alertas")}>
              🔔
            </div>
            <div style={{
              width: 34, height: 34, background: "linear-gradient(135deg,#2f9e5c,#12492b)",
              borderRadius: "50%", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 12, fontWeight: 700,
              color: "#fff", cursor: "pointer"
            }} onClick={() => navigate("/configuracion")}>
              {user?.nombre?.slice(0, 2).toUpperCase()}
            </div>
          </div>
        </header>
        <div className="page">
          <Outlet />
        </div>
      </div>
    </div>
  );
}