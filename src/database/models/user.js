const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// Definimos os campos que nossos registros terão.
const userSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    password: { 
        type: String,
        required: true
    },
    email: { 
        type: String,
        unique: true,
        required: true
    }
})

// Podemos adicionar um método ao Schema. O método 'compare'
// que estamos definindo aqui, irá comparar a senha digitada pelo
// usuário no momento do 'login' (formPass) e a senha criptografada
// que está cadastrada no banco de dados (userPass). 
userSchema.method('compare', async (formPass, userPass) => { 
    return bcrypt.compare(formPass, userPass)
})

// Criamos o Model
const User = mongoose.model("User", userSchema)

module.exports = User