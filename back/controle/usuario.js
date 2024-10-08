import { conexao } from "../conexao.js";

const con = await conexao(); 

export const validarUser = async (codigo_empresa, cpf) => {
    const validar = 'SELECT COUNT(Nome) AS count FROM cliente WHERE Empresa_Cod_empresa = ? AND CPF = ?';

        const [results] = await con.query(validar, [codigo_empresa, cpf]);
        const count = results[0].count; 
        console.log(count);
        return count; 
}

export const login = async (cod, nome, senha) => {
 
    try {
        const sql = "SELECT * FROM cliente";
        const rows = await con.query(sql); 
        
        let a;
let b = 0;


       for(a = 0; a < rows[0].length ;a++){

      if(rows[0][a].Empresa_Cod_empresa == cod && rows[0][a].Nome == nome && rows[0][a].Senha == senha){
       
    return 1;
      }
       }

    } catch (error) {
        console.error("Erro no select_user", error);
      
    }
}

export const getUser = async (res) => {
    try {
        const sql = "SELECT * FROM cliente";
        const [rows] = await con.query(sql); 
        console.log("Consulta realizada com sucesso");
        return rows;
    } catch (error) {
        console.error("Erro no select_user", error);
        if (res) {
            res.status(500).json({ error: "Erro ao obter usuários" });
        } else {
            throw error;
        }
    }
};
export const setUser = async ({ nome, email, senha, cpf, codigo_empresa }) => {
    const con = await conexao(); // Certifique-se que a função conexao() está funcionando corretamente

    try {
        const [result] = await con.execute(
            'INSERT INTO cliente (Nome, Email, Senha, CPF, Empresa_Cod_empresa) VALUES (?, ?, ?, ?, ?)',
            [nome, email, senha, cpf, codigo_empresa]
        );
        return result;
    } catch (error) {
        console.error('Erro ao inserir usuário:', error.message);
        console.error("Nome: " + nome, "Email: " + email, "Senha: " + senha, "CPF: " + cpf, "Empresa: " + codigo_empresa);
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

export const procurar = async (what,valor, nome ) => {
    const con = await conexao();


    
    try {
        const [rows] = await con.query(
            `SELECT ${what} FROM cliente WHERE ${valor} = ?`,
            [nome]
        );
       
        return rows;
    } catch (error) {
        console.error('Erro ao procurar usuário:', error.message);
        throw error;
    }
};



export const qtd_clientes = async () => {
    const con = await conexao();

        const [rows] = await con.query('SELECT COUNT(Nome) AS count FROM cliente');
        const count = rows[0].count;
        return count;
   
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

