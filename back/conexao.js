import mysql from 'mysql2/promise';

export const conexao = async () => {
    if (global.conectar && global.conectar.state !== 'disconnected') {
        return global.conectar;
    }

    const con = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb",
    });

    console.log("conexão funcionou");
    global.conectar = con;
    return con;
};
