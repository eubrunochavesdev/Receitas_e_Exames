import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import Login from "./pages/Login";
import ReceitaExames from "./pages/ReceitaExames";
import Historico from "./pages/Historico";
import "./global.css";

const App = () => {
  const [logado, setLogado] = useState(false);

  return (
    <Router>
      <div>
        {logado ? (
          <>
            {/* Navbar para navegação */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container">
                <Link className="navbar-brand" to="/">Receituário</Link>
                <div className="collapse navbar-collapse">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to="/">Novo Receituário</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/historico">Histórico</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            {/* Rotas protegidas */}
            <Routes>
              <Route path="/" element={<ReceitaExames />} />
              <Route path="/historico" element={<Historico />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </>
        ) : (
          // Exibe a tela de login se o usuário não estiver logado
          <Routes>
            <Route path="*" element={<Login onLogin={() => setLogado(true)} />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
