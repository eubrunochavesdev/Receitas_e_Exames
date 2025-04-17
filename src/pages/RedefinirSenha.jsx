import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RedefinirSenha = () => {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const navigate = useNavigate();

  const handleRedefinirSenha = async () => {
    if (novaSenha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const email = localStorage.getItem("email"); // Supondo que o email foi salvo no login
      await axios.post("http://localhost:3000/redefinir-senha", {
        email,
        novaSenha,
      });
      alert("Senha redefinida com sucesso!");
      navigate("/login"); // Redireciona para a página de login
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Redefinir Senha</h2>
      <div className="form-group">
        <label>Nova Senha</label>
        <input
          type="password"
          className="form-control"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Confirmar Nova Senha</label>
        <input
          type="password"
          className="form-control"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />
      </div>
      <button className="btn btn-primary mt-3" onClick={handleRedefinirSenha}>
        Redefinir Senha
      </button>
    </div>
  );
};

export default RedefinirSenha;
