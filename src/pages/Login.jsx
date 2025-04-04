import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo5s from "../assets/logo_5s.png";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  // Lista de usuários simulada
  const usuarios = [
    { id: 1, nome: "Admin", email: "admin@admin.com", senha: "admin123", tipo: "admin" },
    { id: 2, nome: "Clínica A", email: "clinicaA@exemplo.com", senha: "clinica123", tipo: "clinica" },
    { id: 3, nome: "Clínica B", email: "clinicaB@exemplo.com", senha: "clinica456", tipo: "clinica" },
  ];

  const handleLogin = () => {
    // Verifica se o e-mail e a senha correspondem a um usuário
    const usuario = usuarios.find((u) => u.email === email && u.senha === senha);

    if (usuario) {
      onLogin(usuario); // Atualiza o App com o usuário logado

      // Redireciona com base no tipo de usuário
      if (usuario.tipo === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/receita-exames");
      }
    } else {
      alert("E-mail ou senha incorretos!");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div
        className="bg-white p-4 rounded shadow"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="d-flex justify-content-center align-items-center mb-4">
          <img src={logo5s} alt="Logo 5S Emagrecimento" className="w-100" />
        </div>
        <h2 className="text-center mb-4">Acesso Restrito</h2>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-3"
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          onKeyDown={handleKeyDown}
          className="form-control mb-3"
        />
        <button
          onClick={handleLogin}
          className="btn btn-primary w-100"
        >
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Login;
