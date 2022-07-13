const mongoose = require("mongoose")
const Schema = mongoose.Schema

const clienteSchema = new Schema({ //Schema vai para o banco de dados
    nome: {
        type: String,
        required: true
    },
    idade: {
        type: Number
    },
    ativado: {
        type: Boolean,
        default: true
    },
    data_de_criacao: {
        type: Date,
        default: Date.now
    },
    genero: {
        type: String,
        enum: ['masculino', 'feminino', 'outro']
    },
    pizzas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pizza"
    }]
})

const ClienteModel = mongoose.model("Cliente", clienteSchema) //ClienteModel é onde eu vou MANIPULAR O BANCO DE DADOS
module.exports = ClienteModel