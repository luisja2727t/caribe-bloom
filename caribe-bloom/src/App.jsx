import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Layout    from "./components/Layout";
import Landing   from "./pages/Landing";
import Login     from "./pages/login";
import Dashboard from "./pages/dashboard";
import Parcelas  from "./pages/parcelas";
import Alertas   from "./pages/alertas";
import Historial from "./pages/historial";
import Satelite  from "./pages/satelite";

function App() {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("cb_token");
    const saved = localStorage.getItem("cb_user");
    if (token && saved) {
      try { return JSON.parse(saved); }
      catch { localStorage.removeItem("cb_user"); }
    }
    return null;
  });
  const [loading,   setLoading]   = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = (usuario) => {
    localStorage.setItem("cb_user", JSON.stringify(usuario));
    setUser(usuario);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("cb_token");
    localStorage.removeItem("cb_user");
    setUser(null);
    setShowLogin(false);
  };

  if (loading) return <div className="loading">Cargando...</div>;

  if (user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout user={user} onLogout={handleLogout} />}>
            <Route index             element={<Dashboard />} />
            <Route path="parcelas"  element={<Parcelas />} />
            <Route path="alertas"   element={<Alertas />} />
            <Route path="historial" element={<Historial />} />
            <Route path="satelite"  element={<Satelite />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    );
  }

  if (showLogin) {
    return <Login onLogin={handleLogin} onBack={() => setShowLogin(false)} />;
  }

  return <Landing onLoginClick={() => setShowLogin(true)} />;
}

export default App;