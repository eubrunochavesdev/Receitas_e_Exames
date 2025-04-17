import db from './sqliteConnection.js';

const alterTableQuery = `
ALTER TABLE clinicas ADD COLUMN tipo TEXT NOT NULL DEFAULT 'clinica';
`;

db.run(alterTableQuery, (err) => {
    if (err) {
        console.error('Erro ao alterar tabela "clinicas":', err.message);
    } else {
        console.log('Tabela "clinicas" alterada com sucesso. Campo "tipo" adicionado.');
    }
});
