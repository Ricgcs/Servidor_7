import express from 'express';
import { conexao } from './conexao.js';
import { getUser } from './controle/usuario.js'; // Corrigir caminho relativo

const app = express();
const port = 3000;

app.get('/users', getUser);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
