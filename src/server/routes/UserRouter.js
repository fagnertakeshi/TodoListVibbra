const router = require('express').Router()
const User = require('../../database/models/user')
const passport = require('passport')
const bcrypt = require('bcrypt')
const saltRounds = 10

const jwt = require("jsonwebtoken")
const { secretKey } = require('../../environment/vars')

module.exports = app => {  

    router.get("/", (req, res) => {
    User.find({}, (err, users) => {
        res.send({ User: users });
    });
}); 


router.put("/update/:id", async (req, res) => { 
    const { password, name, email } = req.body
    
    const id= req.params.id

    // Senha é criptografada e o usuário adicionao ao banco de dados
    bcrypt.hash(password, saltRounds)
        .then(async (hash) => {
            await User.findByIdAndUpdate(id, { name, email, password: hash }, (err, newUser) => { 
                if (err) { 
                    console.log(err)
                    return res.status(400).json({ error: "Não conseguimos atualizar o usuário!" })
                }
    
                return res.json({ message: "Usuario atualizado!"})
            })
        })
})

router.delete("/remove/:id", async (req, res) => { 
    const id = req.params.id;
    await User.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
        res.send("Removido com sucesso.");
    });

    })

    
app.use("/api/v1/users",passport.authenticate('jwt', { session: false }), router)}