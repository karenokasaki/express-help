const mongoose = require("mongoose")
const Schema = mongoose.Schema


const pizzaSchema = new Schema({
    sabor: {
        type: String, required: true,
    },
    valor: {
        type: Number, min: 0
    },
    ingredientes: {
        type: String
    },
    quantidade: {
        type: Number, min: 0
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cliente"
    }
})

const PizzaModel = mongoose.model("Pizza", pizzaSchema)
module.exports = PizzaModel