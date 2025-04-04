import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 bg-light p-4 rounded shadow">
      <h2 className="mb-4">Painel Administrativo</h2>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div
            className="card text-center shadow-sm card-hover"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/receita-exames")}
          >
            <div className="card-body">
              <h5 className="card-title">Emitir Receitas</h5>
              <p className="card-text">Clique aqui para emitir receitas para os pacientes.</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div
            className="card text-center shadow-sm card-hover"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admin-panel")}
          >
            <div className="card-body">
              <h5 className="card-title">Emitir Relatórios</h5>
              <p className="card-text">Clique aqui para gerar relatórios administrativos.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;