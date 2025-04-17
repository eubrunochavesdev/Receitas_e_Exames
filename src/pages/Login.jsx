import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo5s from "../assets/logo_5s.png";
import CustomPopup from "../components/CustomPopup";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        senha,
      });

      console.log("Resposta do backend:", response.data);

      const { user } = response.data;

      // Passa o usuário logado para o estado global
      onLogin(user);

      // Redireciona com base no tipo de usuário
      if (user.tipo === "admin") {
        console.log("Redirecionando para admin-dashboard...");
        navigate("/admin-dashboard");
      } else if (user.tipo === "clinica") {
        console.log("Redirecionando para receita-exames...");
        navigate("/receita-exames");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      <CustomPopup
        show={showPopup}
        message={popupMessage}
        onClose={() => setShowPopup(false)}
      />
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div
          className="bg-white p-4 rounded shadow"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <div className="d-flex justify-content-center align-items-center mb-4">
            <img src={logo5s} alt="Logo 5S Emagrecimento" className="w-100" />
          </div>
          <h2 className="text-center mb-4">Acesso Restrito</h2>
          {error && <div className="alert alert-danger">{error}</div>}
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
    </>
  );
};

export default Login;
