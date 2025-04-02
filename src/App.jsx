import React, { useState } from "react";
import Login from "./pages/Login";
import ReceitaExames from "./pages/ReceitaExames";

const App = () => {
  const [logado, setLogado] = useState(false);

  return (
    <div>
      {logado ? <ReceitaExames /> : <Login onLogin={() => setLogado(true)} />}
    </div>
  );
};

export default App;
