const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

// Como iremos verificar se o usuário está ou não 
// cadastrado no banco de dados. Temos que importar
// nossos models
const User = require('../database/models/user')
const ObjectId = require('mongoose').ObjectId

// Importamos a secret key que definimos no arquivo '.env'
// Servirá para gerar a assinatura do token
const { secretKey } = require('../environment/vars')

// Estratégia Local: Receberá o POST do Login.
// No body desta requisição, teremos o campo 'email' e 'password'
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async function (email, password, done) { 

        // O Middlware verifica se o usuário existe no banco de dados
        await User.findOne({ email }, (err, user) => { 
            if (err) {
                return done(err)
            }

            // Se não existir, retorna false ("Não autorizado!")
            if (!user) { 
                return done(null, false, { message: "User doesn't exist" })
            }

            // Se existir, verifica se a senha informada está correta
            user.compare(password, user.password)
                .then(match => { 

                    // Se não estiver, retorna false ("Não autorizado!")
                    if (!match) {
                        return done(null, false, { message: 'Incorrect Password' })
                    }
        
                    // Se sim, retorna as informações do usuário para que o Token seja gerado
                    return done(null, user)
                })
        })
    }
))

// Você deve definir estas funções, caso use Sessões.
passport.serializeUser((user, done) => { 
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => { 
    await User.findById({ _id: ObjectId(id) }, (err, user) => { 
        done(err, user)
    })
})

// Estratégia JWT: Após autenticado, o usuário deverá 
// enviar o token no Header da requisição.
const opts = { 
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey
}

// Aqui, o middleware irá extrair o token do Header
// e verificar se ele é válido. Se o token estiver expirado,
// ou adulterado, o middleware retorna false ("Não autorizado")
passport.use(new JwtStrategy(opts, async (payload, done) => { 
    await User.findOne({ _id: payload._id }, (err, user) => {         
        if (err) { 
            return done(err, false)
        }

        if (!user) { 
            return done(null, false)
        }

        return done(null, { id: user._id })
    })
}))


// Retornamos o middleware
module.exports = app => { 
    app.use(passport.initialize())
}