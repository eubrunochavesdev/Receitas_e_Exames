import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import ReceitaExames from "./pages/ReceitaExames";
import Historico from "./pages/Historico";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import RedefinirSenha from "./pages/RedefinirSenha";
import "./global.css";

const App = () => {
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const handleLogout = () => {
    setUsuarioLogado(null); // Limpa o estado do usuário logado
    localStorage.removeItem("token"); // Remove o token do localStorage
    localStorage.removeItem("email");
    localStorage.removeItem("tipo");
  };

  return (
    <Router>
      <div>
        {usuarioLogado ? (
          usuarioLogado.tipo === "admin" ? (
            // Painel do Administrador
            <>
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                  <Link className="navbar-brand" to="/admin-dashboard">
                    Painel do Administrador
                  </Link>
                  <div className="collapse navbar-collapse justify-content-end">
                    <button className="btn btn-danger" onClick={handleLogout}>
                      Sair
                    </button>
                  </div>
                </div>
              </nav>
              <Routes>
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/admin-panel" element={<AdminPanel />} />
                <Route path="/historico" element={<Historico usuarioLogado={usuarioLogado} />} />
                <Route path="/redefinir-senha" element={<RedefinirSenha />} />
                <Route path="*" element={<Navigate to="/admin-dashboard" replace />} />
              </Routes>
            </>
          ) : (
            // Painel da Clínica
            <>
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                  <Link className="navbar-brand" to="/receita-exames">
                    Receituário
                  </Link>
                  <div className="collapse navbar-collapse justify-content-end">
                    <button className="btn btn-danger" onClick={handleLogout}>
                      Sair
                    </button>
                  </div>
                </div>
              </nav>
              <Routes>
                <Route path="/receita-exames" element={<ReceitaExames />} />
                <Route path="/historico" element={<Historico usuarioLogado={usuarioLogado} />} />
                <Route path="/redefinir-senha" element={<RedefinirSenha />} />
                <Route path="*" element={<Navigate to="/receita-exames" replace />} />
              </Routes>
            </>
          )
        ) : (
          // Tela de Login
          <Routes>
            <Route
              path="*"
              element={
                <Login
                  onLogin={(user) => {
                    setUsuarioLogado(user);
                  }}
                />
              }
            />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;