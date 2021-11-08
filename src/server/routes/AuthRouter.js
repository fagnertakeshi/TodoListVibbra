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
                
                // Se o usuário estiver cadastrado no banco, ele irá receber um token
                // com validade de 1 hora! Após este tempo, ele não poderá mais acessar
                // as rotas protegidas!
                const { _id } = user
                const token = jwt.sign({ _id }, secretKey, { expiresIn: '24h' })

                res.cookie('jwt', token, { 
                    httpOnly: false, 
                    secure: false
                })
                .status(200)
                .send({ msg: "Succesful Login!" })

            })(req, res, next)
    })
    
    router.get("/", (req, res) => {
        User.find({}, (err, users) => {
            res.send({ User: users });
        });
    }); 


    router.post("/register", (req, res) => { 
        const { password, name, email } = req.body

        // Senha é criptografada e o usuário adicionao ao banco de dados
        bcrypt.hash(password, saltRounds)
            .then(async (hash) => {
                await User.create({ name, email, password: hash }, (err, newUser) => { 
                    if (err) { 
                        console.log(err)
                        return res.status(400).json({ error: "User already exists!" })
                    }
        
                    return res.json({ message: "User created!"})
                })
            })
    })


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

    app.use("/api/v1/users", router)}