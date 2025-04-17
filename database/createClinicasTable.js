import db from './sqliteConnection.js';

const createClinicasTableQuery = `
CREATE TABLE IF NOT EXISTS clinicas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    tipo TEXT NOT NULL DEFAULT 'clinica',
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;

const createReceitasTableQuery = `
CREATE TABLE IF NOT EXISTS receitas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuarioId INTEGER NOT NULL,
    nomePaciente TEXT NOT NULL,
    dataNascimento TEXT NOT NULL,
    exames TEXT NOT NULL,
    data TEXT NOT NULL,
    FOREIGN KEY (usuarioId) REFERENCES clinicas (id)
);
`;

db.serialize(() => {
    db.run(createClinicasTableQuery, (err) => {
        if (err) {
            console.error('Erro ao criar tabela "clinicas":', err.message);
        } else {
            console.log('Tabela "clinicas" criada com sucesso.');
        }
    });

    db.run(createReceitasTableQuery, (err) => {
        if (err) {
            console.error('Erro ao criar tabela "receitas":', err.message);
        } else {
            console.log('Tabela "receitas" criada com sucesso.');
        }
    });
});
