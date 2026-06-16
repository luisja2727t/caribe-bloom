import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Layout        from "./components/Layout";
import Landing       from "./pages/Landing";
import Login         from "./pages/login";
import Registro      from "./pages/registro";
import Dashboard     from "./pages/dashboard";
import Parcelas      from "./pages/parcelas";
import Alertas       from "./pages/alertas";
import Historial     from "./pages/historial";
import Satelite      from "./pages/satelite";
import Configuracion from "./pages/configuracion";

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

  const [vista, setVista] = useState("landing"); // "landing" | "login" | "registro"

  const handleLogin = (usuario) => {
    localStorage.setItem("cb_user", JSON.stringify(usuario));
    setUser(usuario);
    setVista("landing");
  };

  const handleLogout = () => {
    localStorage.removeItem("cb_token");
    localStorage.removeItem("cb_user");
    setUser(null);
    setVista("landing");
  };

  if (user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout user={user} onLogout={handleLogout} />}>
            <Route index                element={<Dashboard />} />
            <Route path="parcelas"      element={<Parcelas />} />
            <Route path="alertas"       element={<Alertas />} />
            <Route path="historial"     element={<Historial />} />
            <Route path="satelite"      element={<Satelite />} />
            <Route path="configuracion" element={<Configuracion />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    );
  }

  if (vista === "login") {
    return (
      <Login
        onLogin={handleLogin}
        onBack={() => setVista("landing")}
        onRegistroClick={() => setVista("registro")}
      />
    );
  }

  if (vista === "registro") {
    return (
      <Registro
        onRegistro={handleLogin}
        onLoginClick={() => setVista("login")}
      />
    );
  }

  return (
    <Landing
      onLoginClick={() => setVista("login")}
      onRegistroClick={() => setVista("registro")}
    />
  );
}

export default App;