import { conexao } from "../conexao.js";

const con = await conexao(); // Obtém a conexão

export const getUser = async () => {
    try {
        const sql = "SELECT * FROM cliente";
        const rows = await con.query(sql); // Executa a query e armazena o resultado em 'rows'
        console.log("Consulta realizada com sucesso:", rows);
        
    } catch (error) {
        console.error("Erro no select_user", error);
        res.status(500).json({ error: "Erro ao obter usuários" });
    }
};

export const setUser = async ({ nome, email, senha, cpf, cod, foto }) => {
    const con = await conexao(); // Função para obter a conexão do banco de dados
    try {
        const [result] = await con.execute(
            'INSERT INTO cliente (Nome, Email, Senha, CPF, Empresa_Cod_empresa,foto)VALUES (?, ?, ?, ?, ?, ?)',
            [nome, email, senha, cpf, cod, foto]
        );
        return result;
    } catch (error) {
        console.error('Erro ao inserir usuário:', error.message);
        throw error;
    }
};


export const delUser = async(valor,nome)=>{
    try{
const sql = `DELETE FROM cliente WHERE ${valor} = ?`
const envio = await con.query(sql,nome)
console.log("valor deletado com sucesso", envio)
    }
    catch(error){
        console.error("Erro no del", error);

    }
}

export const procurar = async ({ valor, nome }) => {
    const con = await conexao();
    try {
        const [rows] = await con.query(
            `SELECT * FROM cliente WHERE ${valor} = ?`,
            [nome]
        );
        return rows;
    } catch (error) {
        console.error('Erro ao procurar usuário:', error.message);
        throw error;
    }
};
export const atualizar = async(valor, elemento, ent, tipo)=>{

    try{
const sql = `UPDATE cliente SET ${valor} = ? where ${elemento} = ?`;
const upp = await con.query(sql,[ent, tipo]);
console.log("usuário atualizado",upp);
    }
    catch(error){
        console.log("erro em atualizar",error)
    }
}

