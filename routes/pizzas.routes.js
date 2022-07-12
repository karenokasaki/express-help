const express = require('express')
const router = express.Router()

let allPizzas = require("../allPizzas")

router.get('/todas-pizzas', (req, res) => {


    return res.status(200).json(allPizzas)
})


router.post('/criar-pizza', (req, res) => {

    allPizzas.push(req.body)

    return res.status(201).json(allPizzas)
})

router.delete('/deletar-pizza/:sabor', (req, res) => {

    const { sabor } = req.params

    allPizzas = allPizzas.filter((pizza) => pizza.sabor !== sabor) 

    return res.status(200).json(allPizzas)
})

router.put('/editar-pizza/:sabor', (req, res) => {
    const { sabor } = req.params

    allPizzas.forEach((pizza, i) => {
        if (pizza.sabor === sabor) {
            allPizzas[i] = { ...req.body }
        }
    })

    return res.status(200).json(allPizzas)
})




























router.delete('/deletar-pizza', (req, res) => {

    return res.status(201).json()
})





module.exports = router