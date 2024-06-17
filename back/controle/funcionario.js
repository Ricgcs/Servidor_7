import { conexao } from "../conexao.js";

const con = await conexao(); // Obtém a conexão

export const getFunc = async () => {
    try {
        const sql = "SELECT * FROM funcionario";
        const rows = await con.query(sql); // Executa a query e armazena o resultado em 'rows'
        console.log("Consulta realizada com sucesso:", rows);
        
    } catch (error) {
        console.error("Erro no select_user", error);
        res.status(500).json({ error: "Erro ao obter usuários" });
    }
};

export const setFunc = async ({Nome, Email, Telefone, foto, CPF, Cod_empresa, Cod_cargo, senha}) => {
    const con = await conexao(); // Função para obter a conexão do banco de dados
    try {
        const [result] = await con.execute(
            'INSERT INTO funcionario (Nome, Email, Telefone, foto, CPF, Empresa_Cod_empresa, cargo_Cod_cargo, senha)VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [Nome, Email, Telefone, foto, CPF, Cod_empresa, Cod_cargo, senha]
        );
        return result;
    } catch (error) {
        console.error('Erro ao inserir funcionário:', error.message);
        throw error;
    }
};


export const delFunc = async(valor,nome)=>{
    try{
const sql = `DELETE FROM funcionario WHERE ${valor} = ?`
const envio = await con.query(sql,nome)
console.log("Funcionario deletado com sucesso", envio)
    }
    catch(error){
        console.error("Erro no del", error);

    }
}

export const procurarFunc = async ({ valor, nome }) => {
    const con = await conexao();
    try {
        const [rows] = await con.query(
            `SELECT * FROM funcionario WHERE ${valor} = ?`,
            [nome]
        );
        return rows;
    } catch (error) {
        console.error('Erro ao procurar funcionário:', error.message);
        throw error;
    }
};
export const atualizarFunc = async(valor, elemento, ent, tipo)=>{

    try{
const sql = `UPDATE funcionario SET ${valor} = ? where ${elemento} = ?`;
const upp = await con.query(sql,[ent, tipo]);
console.log("Funcionário atualizado",upp);
    }
    catch(error){
        console.log("erro em atualizar",error)
    }
}

