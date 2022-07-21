const express = require('express')
const router = express.Router()

const ClienteModel = require('../models/Clientes.model')


router.get('/todos-clientes', async (req, res) => {
    try {

        const todosClientes = await ClienteModel.find()

        return res.status(200).json(todosClientes)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
})

router.post('/criar-cliente', async (req, res) => {
    try {

        const novoCliente = await ClienteModel.create(req.body)

        return res.status(201).json(novoCliente)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
})

router.get('/:id', async (req, res) => {
    try {

        const { id } = req.params

        const cliente = await ClienteModel.findById(id).populate('pizzas')

        return res.status(200).json(cliente)

    } catch (error) {
        return res.status(500).json({ msg: error })
    }
})

router.put('/editar-cliente/:id', async (req, res) => {
    try {

        const { id } = req.params

        const clienteEditado = await ClienteModel.findByIdAndUpdate(
            id, //estou passando o id do usuario que eu quero atualizar 
            { ...req.body }, // todas as informações que eu quero atualizar
            { new: true } //pra ele me trazer o usuario atualizado
        )

        return res.status(200).json(clienteEditado)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
})

router.delete('/deletar/:id', async (req, res) => {
    try {

        const { id } = req.params

        const clienteDeletado = await ClienteModel.findByIdAndDelete(id)

        return res.status(200).json(clienteDeletado)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
})

module.exports = router