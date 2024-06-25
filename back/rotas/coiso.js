
import express from "express"
import getUser from "../controle/usuario"
const rota = express.Router()

rota.get('/',getUsers)


export default Router;