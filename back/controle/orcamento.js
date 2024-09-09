import { conexao } from "../conexao.js";

const con = await conexao(); 

export const getOrcamento = async () => {
    try {
        const sql = "SELECT * FROM orcamento";
        const rows = await con.query(sql);
        console.log("Consulta realizada com sucesso:", rows);
        
    } catch (error) {
        console.error("Erro no select orcamento", error);
        res.status(500).json({ error: "Erro ao obter as orcamento" });
    }
};
export const setOrcamento = async (Nome, Descricao, Valor, Desconto, Data_inicio, Data_entrega, Empresa_Cod_empresa) => {
    const con = await conexao(); 
    try {
        const [result] = await con.execute(
            'INSERT INTO Orcamento (Nome_cliente, Descricao, Valor, Desconto, Data_inicio, Data_entrega, Empresa_Cod_empresa) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [Nome, Descricao, Valor, Desconto, Data_inicio, Data_entrega, Empresa_Cod_empresa]
        );
        
        return result;
    } catch (error) {
        console.error('Erro ao inserir o orçamento:', error.message);
        throw error;
    }
};

export const delOrcamento = async(valor,nome)=>{
    try{
const sql = `DELETE FROM orcamento WHERE ? = ?`
const envio = await con.query(sql,valor,nome)
console.log("Orcamento deletada com sucesso", envio)
    }
    catch(error){
        console.error("Erro no del", error);

    }
}

export const procOrcamento = async ({ proc, valor, nome }) => {
    const con = await conexao();
   
    try {
        let sql = `SELECT ${proc} FROM orcamento WHERE ${valor} = ?`;

        const [rows] = await con.query(sql,[nome]);
        return rows[0][proc];
    } catch (error) {
        console.error('Erro ao procurar empresa:', error.message,`valor:${valor}`);
        
        throw error;
    }
};



export const atualizarOrcamento = async(valor, elemento, ent, tipo)=>{

    try{
const sql = `UPDATE orcamento SET ${valor} = ? where ${elemento} = ?`;
const upp = await con.query(sql,[ent, tipo]);
console.log("Orcamento atualizada",upp);
    }
    catch(error){
        console.log("erro em atualizar",error)
    }
}


