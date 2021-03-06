//importar o framework que estamos usando
const express = require('express') // import express from "express" = ES6

//inicializando o meu express na variável chamada app
//de agora em diante, vamos manipular o framework SEMPRE pela variável APP
const app = express()

//!habilitando o express a ler e enviar arquivos json 
app.use(express.json())

//configurando o dotEnv
require('dotenv').config()

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
app.use('/clientes', clientesRouter)





//recebe dois argumetnos
//1º arg: PORTA
//2º arg: callback com alguma mensagem
app.listen(Number(process.env.PORT), () => {
    console.log(`servindo rodando na porta http://localhost:${process.env.PORT}/ - Angelo`)
})
