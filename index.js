//importar o framework que estamos usando
const express = require('express') // import express from "express" = ES6

//inicializando o meu express na variável chamada app
//de agora em diante, vamos manipular o framework SEMPRE pela variável APP
const app = express()

//!habilitando o express a ler e enviar arquivos json 
app.use(express.json())

//configurar o nosso banco de dados
const connect = require('./config/db.config')
connect()


//daqui pra baixo, vamos fazer nossas rotas
//req = requisição
//res = resposta



//CRIANDO MINAH PRIMEIRA ROTA
const pizzasRouter = require("./routes/pizzas.routes")
app.use('/pizzas', pizzasRouter)

const clientesRouter = require('./routes/clientes.routes')
app.use('/clients', clientesRouter)





//recebe dois argumetnos
//1º arg: PORTA
//2º arg: callback com alguam mensagem
const PORT = 4000
app.listen(PORT, () => {
    console.log(`servindo rodando na porta http://localhost:${PORT}/ - Angelo`)
})
