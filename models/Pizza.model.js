const mongoose = require("mongoose")
const Schema = mongoose.Schema


const PizzaSchema = new Schema({
    sabor: {type: String, required: true, },
    valor: {type: Number, min: 0}, 
    ingredientes: {type: String}
})