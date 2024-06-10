import express from "express"
const host ="127.0.0.1";
const porta =3000;
const user = "localhost"
const app = express();


app.use(express.json());

app.listen(porta,host,user,console.log("servidor rodando"));