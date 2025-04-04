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
import "./global.css";

const App = () => {
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const handleLogout = () => {
    setUsuarioLogado(null); // Limpa o estado do usuário logado
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
                  <Link className="navbar-brand" to="/">
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
                <Route path="/" element={<AdminDashboard />} />{" "}
                {/* Dashboard com os botões */}
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/admin-panel" element={<AdminPanel />} />{" "}
                {/* Relatórios */}
                <Route
                  path="/receita-exames"
                  element={<ReceitaExames usuarioLogado={usuarioLogado} />} // Receitas
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </>
          ) : (
            // Painel da Clínica
            <>
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                  <Link className="navbar-brand" to="/">
                    Receituário
                  </Link>
                  <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto">
                      <li className="nav-item">
                        <Link className="btn btn-primary me-2" to="/">
                          Novo Receituário
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="btn btn-success me-2" to="/historico">
                          Histórico
                        </Link>
                      </li>
                    </ul>
                    <button className="btn btn-danger" onClick={handleLogout}>
                      Sair
                    </button>
                  </div>
                </div>
              </nav>
              <Routes>
                <Route
                  path="/"
                  element={<ReceitaExames usuarioLogado={usuarioLogado} />}
                />
                <Route
                  path="/historico"
                  element={<Historico usuarioLogado={usuarioLogado} />}
                />
                <Route
                  path="/receita-exames"
                  element={<ReceitaExames usuarioLogado={usuarioLogado} />}
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </>
          )
        ) : (
          // Tela de Login
          <Routes>
            <Route path="*" element={<Login onLogin={setUsuarioLogado} />} />
          </Routes>
        )}
        {!usuarioLogado && (
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
