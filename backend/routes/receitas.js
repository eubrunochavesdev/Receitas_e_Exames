const express = require("express");
const router = express.Router();

// Simulação de receitas no banco de dados
const receitas = [
  { id: 1, usuarioId: 3, nomePaciente: "João Silva", data: "2023-10-01" },
  { id: 2, usuarioId: 3, nomePaciente: "Maria Oliveira", data: "2023-10-02" },
  { id: 3, usuarioId: 4, nomePaciente: "Carlos Souza", data: "2023-10-03" },
];

// Endpoint para obter receitas
router.get("/receitas", (req, res) => {
  console.log("Recebida requisição para /receitas");
  res.json(receitas);
});

module.exports = router;
