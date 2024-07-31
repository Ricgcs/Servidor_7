import { conexao } from "../conexao.js";

const con = await conexao(); 

export const validarUser = async (cod_empr, cpf) => {
    const validar = 'SELECT COUNT(Nome) AS count FROM cliente WHERE Empresa_Cod_empresa = ? AND CPF = ?';

        const [results] = await con.query(validar, [cod_empr, cpf]);
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


export const getUser = async () => {
    try {
        const sql = "SELECT * FROM cliente";
        const rows = await con.query(sql); 
        console.log("Consulta realizada com sucesso:", rows);
        
    } catch (error) {
        console.error("Erro no select_user", error);
        res.status(500).json({ error: "Erro ao obter usuários" });
    }
};

export const setUser = async ({ nome, email, senha, cpf, cod, foto }) => {
    const con = await conexao();
  
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

