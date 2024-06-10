import { conexao } from "../conexao.js";

const con = await conexao(); // Obtém a conexão

export const getUser = async (req, res) => {
    try {
        const sql = "SELECT * FROM cliente";
        const rows = await con.query(sql); // Executa a query e armazena o resultado em 'rows'
        console.log("Consulta realizada com sucesso:", rows);
        
    } catch (error) {
        console.error("Erro no select_user", error);
        res.status(500).json({ error: "Erro ao obter usuários" });
    }
};
const setUser = async (id, nome) => {
    try {
        const sql ="INSERT INTO cliente VALUES (?, ?)";
        const envio = await con.query(sql, [id, nome]);
        console.log("Cadastro realizado com sucesso:", envio);
    } catch (error) {
        console.error("Erro no cadastro", error);
    }
};

const delUser = async(valor,nome)=>{
    try{
const sql = `DELETE FROM cliente WHERE ${valor} = ?`
const envio = await con.query(sql,nome)
console.log("valor deletado com sucesso", envio)
    }
    catch(error){
        console.error("Erro no del", error);

    }
}

const procurar = async (valor, termo, elemento) => {
    try {
        const sql = `SELECT ${valor} FROM cliente WHERE ${termo} = ?`;
        const [procura] = await con.query(sql, [elemento]);
        console.log("Usuário encontrado:", procura);
    } catch (error) {
        console.error("Erro", error);
    }
};

const atualizar = async(valor, elemento, req, res)=>{
    try{
const sql = `UPDATE cliente SET ${valor} = ? where ${req} = ?`;
const upp = await con.query(sql,elemento,res);
console.log("usuário atualizado",upp);
    }
    catch(error){
        console.log("erro em atualizar",error)
    }
}

// Chamada das funções para teste
getUser();
procurar("nome", "idcliente", 1);
setUser(2, "Maria");
delUser("idcliente", 2);
atualizar("nome", "Carlos", "idcliente", 1);
