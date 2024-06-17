import { conexao } from "../conexao.js";

const con = await conexao(); // Obtém a conexão

export const getProd = async () => {
    try {
        const sql = "SELECT * FROM Produto";
        const rows = await con.query(sql); // Executa a query e armazena o resultado em 'rows'
        console.log("Consulta realizada com sucesso:", rows);
        
    } catch (error) {
        console.error("Erro no select_Prod", error);
        res.status(500).json({ error: "Erro ao obter os produtos" });
    }
};

export const setProd = async ({ nome, valor, quantidade, area, cod_empr, foto }) => {
    const con = await conexao(); // Função para obter a conexão do banco de dados
    try {
        const [result] = await con.execute(
            'INSERT INTO Produto (Nome, Valor, Quantidade, Area, Empresa_Cod_empresa,foto)VALUES (?, ?, ?, ?, ?, ?)',
            [nome, valor, quantidade, area, cod_empr, foto ]
        );
        return result;
    } catch (error) {
        console.error('Erro ao inserir produto:', error.message);
        throw error;
    }
};


export const delProd = async(valor,nome)=>{
    try{
const sql = `DELETE FROM Produto WHERE ${valor} = ?`
const envio = await con.query(sql,nome)
console.log("Produto deletado com sucesso", envio)
    }
    catch(error){
        console.error("Erro no del", error);

    }
}

export const procurarProd = async ({ valor, nome }) => {
    const con = await conexao();
    try {
        const [rows] = await con.query(
            `SELECT * FROM Produto WHERE ${valor} = ?`,
            [nome]
        );
        return rows;
    } catch (error) {
        console.error('Erro ao procurar produto:', error.message);
        throw error;
    }
};
export const atualizarProd = async(valor, elemento, ent, tipo)=>{

    try{
const sql = `UPDATE Produto SET ${valor} = ? where ${elemento} = ?`;
const upp = await con.query(sql,[ent, tipo]);
console.log("Produto atualizado",upp);
    }
    catch(error){
        console.log("erro em atualizar",error)
    }
}

