const router = require('express').Router()

// Importe o passport
const passport = require('passport')

module.exports = app => { 
  router.route('/')
    .get((req, res) => res.json({ message: "Home Route" }))
  
  // Adicione o middleware de autenticação que utiliza a estratégia JWT
  app.use('/home', passport.authenticate('jwt', { session: false }), router)
}