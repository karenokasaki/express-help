const mongoose = require('mongoose')

async function connect() {
    try {
        //essa é a função qque vai se conectar com o seu banco de dados
        const dbConnection = await mongoose.connect(
            process.env.MONGODB_URI //é a unica linha que importa
        )
        console.log("Conectado ao banco de dados:", dbConnection.connection.name)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connect