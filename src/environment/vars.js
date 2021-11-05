// 'process.env' é um objeto que contém as variáveis de ambiente.
// Aqui estamos utilizando desestruturação para obter apenas aquelas
// que definimos no arquivo '.env'.
require('dotenv').config()
const { CONNECTION_STRING, PORT, SECRET_KEY } = process.env

module.exports = { 
    connection_string: CONNECTION_STRING,
    port: PORT,
    secretKey: SECRET_KEY
}