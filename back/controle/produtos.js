import { conexao } from "../conexao.js";

const con = await conexao();

export const getProd = async () => {
    try {
        const sql = "SELECT * FROM Produto";
        const [rows] = await con.query(sql); 
        console.log("Consulta realizada com sucesso:", rows);
        
    } catch (error) {
        console.error("Erro no select_Prod", error);
        res.status(500).json({ error: "Erro ao obter os produtos" });
    }
};

export const setProd = async ( {nome, valor, quantidade,cod_empr, altura, comprimento, largura}) => {
    const con = await conexao();
    try {
        const [result] = await con.execute(
            'INSERT INTO Produto (Nome, Valor, Quantidade, Empresa_Cod_empresa, Altura, Produtocol,Largura)VALUES (?, ?, ?, ?, ?, ?, ?)',
            [nome, valor, quantidade, cod_empr, altura, comprimento, largura ]
        );
        return result;
    } catch (error) {
        console.error('Erro ao inserir produto:', error.message);
        console.log(nome, valor, quantidade,cod_empr, altura, comprimento, largura)
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

export const procurarProd = async (nome) => {
    const con = await conexao();
    try {
        const [rows] = await con.query(
            `SELECT * FROM Produto WHERE Empresa_Cod_empresa = ?`,
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

