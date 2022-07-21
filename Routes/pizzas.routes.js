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
            cliente: idCliente,
            valorTotal: req.body.quantidade * req.body.valorUnitario
        }
    )

    await ClienteModel.findByIdAndUpdate(
        idCliente,
        { $push: { pizzas: novaPizza._id } }
    )

    return res.status(201).json(novaPizza)
})

router.delete('/delete/:id', async (req, res) => {

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

router.put('/aumentar-pizza/:idPizza', async (req, res) => {

    const { idPizza } = req.params
    //pegar minha pizza
    const onePizza = await PizzaModel.findById(idPizza)

    //agora eu faço realmente minha alteração
    const pizzaEditada = await PizzaModel.findByIdAndUpdate(
        idPizza,
        {
            $set: {
                quantidade: req.body.quantidade + onePizza.quantidade,
                valorTotal: (req.body.quantidade + onePizza.quantidade) * onePizza.valorUnitario
            }
        },
        { new: true }
    )


    return res.status(200).json(pizzaEditada)
})

router.put('/diminuir-pizza/:idPizza', async (req, res) => {

    const { idPizza } = req.params
    //pegar minha pizza
    const onePizza = await PizzaModel.findById(idPizza)

    //if que vai checar se a quantidade não vai ficar menor que 0
    if ((onePizza.quantidade - req.body.quantidade) < 0) {
        return res.status(450).json(`Não temos estoque para isso. A quantidade de pizza em estoque é: ${onePizza.quantidade}`)
    }

    //agora eu faço realmente minha alteração
    const pizzaEditada = await PizzaModel.findByIdAndUpdate(
        idPizza,
        {
            $set: {
                quantidade: onePizza.quantidade - req.body.quantidade,
                valorTotal: (onePizza.quantidade - req.body.quantidade) * onePizza.valorUnitario
            }
        },
        { new: true }
    )

    return res.status(200).json(pizzaEditada)
})

























router.delete('/deletar-pizza', (req, res) => {

    return res.status(201).json()
})





module.exports = router