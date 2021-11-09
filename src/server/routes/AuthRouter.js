const router = require('express').Router()
const User = require('../../database/models/user')
const passport = require('passport')
const bcrypt = require('bcrypt')
const saltRounds = 10

const jwt = require("jsonwebtoken")
const { secretKey } = require('../../environment/vars')

module.exports = app => {     
    router.post("/login", (req, res, next) => { 
        passport.authenticate('local', 
            { session: false }, 
            (err, user, info) => { 
                if (err) { 
                    return res.status(500).json({ err })
                }

                if (!user) { 
                    const { message } = info
                    return res.status(401).json({ message })
                }
                
            
                const { _id } = user
                const token = jwt.sign({ _id }, secretKey, { expiresIn: '24h' })

                res.cookie('jwt', token, { 
                    httpOnly: false, 
                    secure: false
                })
                .status(200)
                .send({ msg: "Login efetuado com sucesso!" })

            })(req, res, next)
    })
    
  

    router.post("/register", (req, res) => { 
        const { password, name, email } = req.body

      
        bcrypt.hash(password, saltRounds)
            .then(async (hash) => {
                await User.create({ name, email, password: hash }, (err, newUser) => { 
                    if (err) { 
                        console.log(err)
                        return res.status(400).json({ error: "Erro ao criar usuário!" })
                    }
        
                    return res.json({ message: "Usuário criado com sucesso!"})
                })
            })
    })

    app.use("/api/v1/users", router)}