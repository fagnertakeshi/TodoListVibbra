// Importamos algumas variáveis de ambiente
const { port } = require('../environment/vars')

// Importamos a função que retorna uma instância do mongoose
const conn = require('../database/connection')

module.exports = app => { 
 conn()
 .then(async () => { 
   console.log(`\nConnected to MongoDB`)  
    
   app.listen(port, () => { 
    console.log(`Server is listenning on port ${ port }`)
   })
 })
 .catch(error => { 
    console.log(error)
 }) 
}