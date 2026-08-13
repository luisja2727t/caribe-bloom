import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

const IconGrid = (p) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
);
const IconMap = (p) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" /><line x1="9" y1="3" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="21" />
  </svg>
);
const IconSatellite = (p) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M4 10a7.31 7.31 0 0 0 10 10Z" /><path d="m9 15 3-3" /><path d="M17 13a6 6 0 0 0-6-6" /><path d="M21 13A10 10 0 0 0 11 3" />
  </svg>
);
const IconHistory = (p) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l4 2" />
  </svg>
);
const IconAlert = (p) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" />
  </svg>
);
const IconSettings = (p) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
  </svg>
);
const IconMenu = (p) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);
const IconBell = (p) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);
const IconLogOut = (p) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const NAV = [
  { to: "/",            label: "Dashboard",         Icon: IconGrid },
  { to: "/parcelas",    label: "Mis Parcelas",       Icon: IconMap },
  { to: "/satelite",    label: "Análisis Satelital", Icon: IconSatellite },
  { to: "/historial",   label: "Historial",          Icon: IconHistory },
  { to: "/alertas",     label: "Alertas",            Icon: IconAlert },
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
          }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-11 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg></div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Caribe Bloom</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.5px" }}>AgriMonitor</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: "8px 10px", flex: 1 }}>
          {NAV.map(({ to, label, Icon }) => (
            <NavLink key={to} to={to} end={to === "/"} style={navStyle}>
              <Icon />
              {label}
            </NavLink>
          ))}
        </nav>
        {/* Configuracion */}
        <div style={{ padding: "0 10px 8px" }}>
          <NavLink to="/configuracion" style={navStyle}>
            <IconSettings /> Configuración
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
          <button onClick={() => { onLogout(); navigate("/"); }} title="Cerrar sesión"
            style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", padding: 4, display: "flex" }}>
            <IconLogOut />
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
            background: "none", border: "none", cursor: "pointer", color: "var(--text2)", padding: 4, display: "flex"
          }}><IconMenu /></button>
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
              color: "var(--text2)", cursor: "pointer"
            }} onClick={() => navigate("/alertas")}>
              <IconBell />
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
