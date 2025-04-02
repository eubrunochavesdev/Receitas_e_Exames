import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [senha, setSenha] = useState("");
  const senhaCorreta = "12345"; // Você pode mudar isso depois

  const handleLogin = () => {
    if (senha === senhaCorreta) {
      onLogin();
    } else {
      alert("Senha incorreta!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Acesso Restrito</h2>
        <input
          type="password"
          placeholder="Digite a senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="border p-2 w-full rounded mb-4"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 w-full rounded shadow-md hover:bg-blue-700 transition"
        >
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Login;
