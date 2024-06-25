
import { conexao } from "../conexao.js";

const con = await conexao(); // Obtém a conexão

export const getCarg = async () => {
    try {
        const sql = "SELECT * FROM cargo";
        const rows = await con.query(sql); // Executa a query e armazena o resultado em 'rows'
        console.log("Consulta realizada com sucesso:", rows);
        
    } catch (error) {
        console.error("Erro no select_user", error);
        res.status(500).json({ error: "Erro ao obter os cargos" });
    }
};

export const setCarg = async ({Nome, Salario, Cod_empresa }) => {
    const con = await conexao(); // Função para obter a conexão do banco de dados
    try {
        const [result] = await con.execute(
            'INSERT INTO cargo (Nome, Salario, Empresa_Cod_empresa )VALUES (?, ?, ?)',
            [Nome, Salario, Cod_empresa ]
        );
        return result;
    } catch (error) {
        console.error('Erro ao inserir usuário:', error.message);
        throw error;
    }
};


export const delCarg = async(valor,nome)=>{
    try{
const sql = `DELETE FROM cargo WHERE ${valor} = ?`
const envio = await con.query(sql,nome)
console.log("valor deletado com sucesso", envio)
    }
    catch(error){
        console.error("Erro no del", error);

    }
}

export const procurarCargo = async ({ valor, nome }) => {
    const con = await conexao();
    try {
        const [rows] = await con.query(
            `SELECT * FROM cargo WHERE ${valor} = ?`,
            [nome]
        );
        return rows;
    } catch (error) {
        console.error('Erro ao procurar o cargo:', error.message);
        throw error;
    }
};
export const atualizarCargo = async(valor, nome, ent, tipo)=>{

    try{
const sql = `UPDATE cargo SET ${valor} = ? where ${nome} = ?`;
const upp = await con.query(sql,[ent, tipo]);
console.log("Cargo atualizado",upp);
    }
    catch(error){
        console.log("erro em atualizar",error)
    }
}

