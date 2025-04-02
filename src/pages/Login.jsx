import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [senha, setSenha] = useState("");
  const senhaCorreta = "12345";

  const handleLogin = () => {
    if (senha === senhaCorreta) {
      onLogin();
    } else {
      alert("Senha incorreta!");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin(); // Chama a função de login ao pressionar "Enter"
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div
        className="bg-white p-4 rounded shadow"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Acesso Restrito</h2>
        <input
          type="password"
          placeholder="Digite a senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          onKeyDown={handleKeyDown} // Adiciona o evento para capturar a tecla "Enter"
          className="form-control mb-3"
        />
        <button
          onClick={handleLogin}
          className="button w-100"
        >
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Login;
