const express = require("express");
const cors = require("cors"); // Adiciona suporte a CORS
const receitasRoutes = require("./routes/receitas"); // Importa as rotas de receitas
const app = express();

app.use(cors()); // Habilita CORS para evitar problemas de requisição entre frontend e backend
app.use(express.json());
app.use("/api", receitasRoutes); // Adiciona o prefixo /api para as rotas de receitas

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
