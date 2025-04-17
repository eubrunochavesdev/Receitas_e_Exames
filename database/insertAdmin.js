import db from './sqliteConnection.js';

const insertAdminQuery = `
INSERT INTO clinicas (nome, email, senha, tipo)
VALUES ('Admin', 'admin@admin.com', 'admin123', 'admin')
ON CONFLICT(email) DO NOTHING;
`;

db.run(insertAdminQuery, (err) => {
    if (err) {
        console.error('Erro ao inserir ADMIN:', err.message);
    } else {
        console.log('ADMIN inserido com sucesso ou já existe.');
    }
});
