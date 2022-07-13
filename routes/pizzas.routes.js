const express = require('express')
const router = express.Router()

const PizzaModel = require('../models/Pizza.model')
const ClienteModel = require('../models/Clientes.model')

router.get('/todas-pizzas', async (req, res) => {

    const todasPizzas = await PizzaModel.find()

    return res.status(200).json(todasPizzas)
})


router.post('/criar-pizza/:idCliente', async (req, res) => {

    const { idCliente } = req.params

    const novaPizza = await PizzaModel.create(
        {
            ...req.body,
            cliente: idCliente
        }
    )

    await ClienteModel.findByIdAndUpdate(
        idCliente,
        { $push: { pizzas: novaPizza._id } }
    )

    return res.status(201).json(novaPizza)
})

router.delete('/deletar-pizza/:id', async (req, res) => {

    const { id } = req.params

    const pizzaDeletada = await PizzaModel.findByIdAndDelete(id)

    await ClienteModel.findByIdAndUpdate(
        pizzaDeletada.cliente,
        { $pull: { pizzas: pizzaDeletada._id } }
    )

    return res.status(200).json(pizzaDeletada)
})

router.put('/editar-pizza/:id', async (req, res) => {
    const { id } = req.params

    const pizzaEditada = await PizzaModel.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true }
    )

    return res.status(200).json(pizzaEditada)
})




























router.delete('/deletar-pizza', (req, res) => {

    return res.status(201).json()
})





module.exports = router