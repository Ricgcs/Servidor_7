import { conexao } from "../conexao.js";

const con = await conexao(); // Obtém a conexão

export const getEmpresa = async () => {
    try {
        const sql = "SELECT * FROM Empresa";
        const rows = await con.query(sql); // Executa a query e armazena o resultado em 'rows'
        console.log("Consulta realizada com sucesso:", rows);
        
    } catch (error) {
        console.error("Erro no select_empresa", error);
        res.status(500).json({ error: "Erro ao obter as empresas" });
    }
};

export const setEmpr = async ({Nome, RS, Email, CNPJ, Senha, Foto}) => {
    const con = await conexao(); // Função para obter a conexão do banco de dados
    try {
        const [result] = await con.execute(
            'INSERT INTO Empresa (Nome, Razao_social, Email,CNPJ, Senha,Foto)VALUES (?, ?, ?, ?, ?, ?)',
            [Nome, RS, Email, CNPJ, Senha, Foto]
        );
        return result;
    } catch (error) {
        console.error('Erro ao inserir a empresa:', error.message);
        throw error;
    }
};


export const delEmpr = async(valor,nome)=>{
    try{
const sql = `DELETE FROM Empresa WHERE ${valor} = ?`
const envio = await con.query(sql,nome)
console.log("Empresa deletada com sucesso", envio)
    }
    catch(error){
        console.error("Erro no del", error);

    }
}

export const procurarEmp = async ({ valor, nome }) => {
    const con = await conexao();
    try {
        const [rows] = await con.query(
            `SELECT * FROM Empresa WHERE ${valor} = ?`,
            [nome]
        );
        return rows;
    } catch (error) {
        console.error('Erro ao procurar empresa:', error.message);
        throw error;
    }
};
export const atualizarEmp = async(valor, elemento, ent, tipo)=>{

    try{
const sql = `UPDATE Empresa SET ${valor} = ? where ${elemento} = ?`;
const upp = await con.query(sql,[ent, tipo]);
console.log("Empresa atualizada",upp);
    }
    catch(error){
        console.log("erro em atualizar",error)
    }
}

