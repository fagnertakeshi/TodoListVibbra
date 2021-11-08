const router = require('express').Router()

// Importe o passport
const passport = require('passport');
const express = require("express");

const Lista = require("../../database/models/Lista");

module.exports = app => { 

app.use(express.urlencoded({ extended: true })); 


router.post('/insert',async (req, res) => {

// Inserir Lista
const lista = new Lista({
    title: req.body.title,
    owner: req.body.owner
});
try {
    await lista.save();
    res.send(lista);
    } catch (err) {
    res.redirect("Erro ao atualizar.");
    }
});
        
// Listar todas as listas
router.get("/", (req, res) => {
    Lista.find({}, (err, listas) => {
        res.send({ Lista: listas });
    });
});    
    
// Atualizar lista pelo id
router.put("/edit/:id", (req, res) => {
    const id = req.params.id;
    Lista.findByIdAndUpdate(id, { title: req.body.title }, err => {
    if (err) return res.send(500, err);
        res.send("Atualizado com sucesso");
    });
});

// Deletar Lista
router.delete("/remove/:id",(req, res) => {
    const id = req.params.id;
    console.log(id);
    Lista.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
        res.send("Removido com sucesso.");
    });
});

app.use('/api/v1/lists', passport.authenticate('jwt', { session: false }), router)

}