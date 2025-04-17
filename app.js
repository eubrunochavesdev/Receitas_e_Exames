import express from 'express';
import cors from 'cors'; // Importa o pacote CORS
import './database/createClinicasTable.js'; // Importa o script para criar as tabelas
import db from './database/sqliteConnection.js';

const app = express();
const port = 3000;

// Middlewares
app.use(cors()); // Permite requisições de outras origens
app.use(express.json());

// Função auxiliar para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Rotas
app.get('/', (req, res) => {
    res.send('API de Cadastro de Clínicas funcionando!');
});

// Rota para cadastrar uma clínica
app.post('/clinicas', (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Email inválido.' });
    }

    if (senha.length < 6) {
        return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres.' });
    }

    const query = `INSERT INTO clinicas (nome, email, senha) VALUES (?, ?, ?)`;
    db.run(query, [nome, email, senha], function (err) {
        if (err) {
            console.error('Erro ao cadastrar clínica:', err.message);
            return res.status(500).json({ error: 'Erro ao cadastrar clínica.' });
        }
        res.status(201).json({ id: this.lastID, nome, email });
    });
});

// Rota para listar todas as clínicas
app.get('/clinicas', (req, res) => {
    const query = `SELECT id, nome, email, criado_em FROM clinicas`;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Erro ao listar clínicas:', err.message);
            return res.status(500).json({ error: 'Erro ao listar clínicas.' });
        }
        res.status(200).json(rows);
    });
});

// Rota para atualizar uma clínica
app.put('/clinicas/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    if (!nome && !email && !senha) {
        return res.status(400).json({ error: 'Pelo menos um campo (nome, email ou senha) deve ser fornecido para atualização.' });
    }

    if (email && !isValidEmail(email)) {
        return res.status(400).json({ error: 'Email inválido.' });
    }

    if (senha && senha.length < 6) {
        return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres.' });
    }

    const fields = [];
    const values = [];

    if (nome) {
        fields.push('nome = ?');
        values.push(nome);
    }
    if (email) {
        fields.push('email = ?');
        values.push(email);
    }
    if (senha) {
        fields.push('senha = ?');
        values.push(senha);
    }

    values.push(id);

    const query = `UPDATE clinicas SET ${fields.join(', ')} WHERE id = ?`;

    db.run(query, values, function (err) {
        if (err) {
            console.error('Erro ao atualizar clínica:', err.message);
            return res.status(500).json({ error: 'Erro ao atualizar clínica.' });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Clínica não encontrada.' });
        }

        res.status(200).json({ message: 'Clínica atualizada com sucesso.' });
    });
});

// Rota para atualizar a senha de uma clínica
app.put('/clinicas/:id/senha', (req, res) => {
    const { id } = req.params;
    const { senha } = req.body;

    if (!senha || senha.length < 6) {
        return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres.' });
    }

    const query = `UPDATE clinicas SET senha = ? WHERE id = ?`;

    db.run(query, [senha, id], function (err) {
        if (err) {
            console.error('Erro ao atualizar senha:', err.message);
            return res.status(500).json({ error: 'Erro ao atualizar senha.' });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Clínica não encontrada.' });
        }

        res.status(200).json({ message: 'Senha atualizada com sucesso.' });
    });
});

// Rota para atualizar o tipo de uma clínica
app.put('/clinicas/:id/tipo', (req, res) => {
    const { id } = req.params;
    const { tipo } = req.body;

    if (!tipo || (tipo !== 'admin' && tipo !== 'clinica')) {
        return res.status(400).json({ error: 'Tipo inválido. Deve ser "admin" ou "clinica".' });
    }

    const query = `UPDATE clinicas SET tipo = ? WHERE id = ?`;

    db.run(query, [tipo, id], function (err) {
        if (err) {
            console.error('Erro ao atualizar tipo:', err.message);
            return res.status(500).json({ error: 'Erro ao atualizar tipo.' });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Clínica não encontrada.' });
        }

        res.status(200).json({ message: 'Tipo atualizado com sucesso.' });
    });
});

// Rota para excluir uma clínica
app.delete('/clinicas/:id', (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM clinicas WHERE id = ?`;

    db.run(query, [id], function (err) {
        if (err) {
            console.error('Erro ao excluir clínica:', err.message);
            return res.status(500).json({ error: 'Erro ao excluir clínica.' });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Clínica não encontrada.' });
        }

        res.status(200).json({ message: 'Clínica excluída com sucesso.' });
    });
});

// Rota para autenticar usuários
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    const query = `SELECT id, nome, email, tipo FROM clinicas WHERE email = ? AND senha = ?`;
    db.get(query, [email, senha], (err, row) => {
        if (err) {
            console.error('Erro ao autenticar usuário:', err.message);
            return res.status(500).json({ error: 'Erro ao autenticar usuário.' });
        }

        if (!row) {
            return res.status(401).json({ error: 'Email ou senha incorretos.' });
        }

        res.status(200).json({ message: 'Login bem-sucedido.', user: row });
    });
});

// Rota para salvar receitas
app.post('/receitas', (req, res) => {
    const { usuarioId, nomePaciente, dataNascimento, exames, data } = req.body;

    if (!usuarioId || !nomePaciente || !dataNascimento || !exames || !data) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const query = `
        INSERT INTO receitas (usuarioId, nomePaciente, dataNascimento, exames, data)
        VALUES (?, ?, ?, ?, ?)
    `;
    db.run(query, [usuarioId, nomePaciente, dataNascimento, JSON.stringify(exames), data], function (err) {
        if (err) {
            console.error('Erro ao salvar receita:', err.message);
            return res.status(500).json({ error: 'Erro ao salvar receita.' });
        }
        res.status(201).json({ message: 'Receita salva com sucesso.', id: this.lastID });
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
