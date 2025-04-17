const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const { Usuario } = require("../models"); // Supondo que você tenha um modelo de usuário

// Endpoint de login
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verifica se o usuário existe
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    // Verifica a senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    // Gera o token JWT
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, tipo: usuario.tipo },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Retorna o token, o status de primeiro acesso e o tipo de usuário
    res.json({
      message: "Login bem-sucedido.",
      user: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo,
      },
      token, // Inclui o token na resposta
      primeiroAcesso: usuario.primeiroAcesso, // Inclui o status de primeiro acesso
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
});

// Endpoint de Redefinição de Senha
router.post("/redefinir-senha", async (req, res) => {
  const { email, novaSenha } = req.body;

  try {
    // Verifica se o usuário existe
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // Atualiza a senha e o campo primeiroAcesso
    const senhaHash = await bcrypt.hash(novaSenha, 10);
    await Usuario.update(
      { senha: senhaHash, primeiroAcesso: false },
      { where: { email } }
    );

    res.json({ message: "Senha redefinida com sucesso." });
  } catch (error) {
    console.error("Erro ao redefinir senha:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
});

module.exports = router;
