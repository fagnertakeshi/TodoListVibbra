const mongoose = require('mongoose')

// Importamos a string de conexão definida no arquivo '.env'
const { connection_string } = require('../environment/vars')

// Definimos uma função que retorna uma <Promise>
// Essa Pormise, se resolvida, dirá que nossa conexão está OK.
const conn = () => {
    return mongoose.connect(connection_string, { 
        useNewUrlParser: false,
        useUnifiedTopology: true 
    })
};

module.exports = conn