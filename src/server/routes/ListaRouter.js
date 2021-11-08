const router = require('express').Router()

// Importe o passport
const passport = require('passport');
const express = require("express");

const Lista = require("../../database/models/Lista");

module.exports = app => { 

app.use("/static", express.static("static"));
app.use(express.urlencoded({ extended: true })); 

app.use('/api/v1/lists/', passport.authenticate('jwt', { session: false }), router)
app.use('/api/v1/lists/insert', passport.authenticate('jwt', { session: false }), router)
app.use('/api/v1/lists//edit/:id', passport.authenticate('jwt', { session: false }), router)
app.use('/api/v1/lists/remove/:id', passport.authenticate('jwt', { session: false }), router)


app.post('/api/v1/lists/insert',async (req, res) => {

// Inserir Lista
const lista = new Lista({
    title: req.body.title,
    owner: req.body.owner
});
try {
    await lista.save();
    res.send("Atualizado com sucesso.");
    } catch (err) {
    res.redirect("Erro ao atualizar.");
    }
});
        
// Listar todas as listas
app.get("/api/v1/lists", (req, res) => {
    Lista.find({}, (err, listas) => {
        res.send({ Lista: listas });
    });
});    
    
// Atualizar lista pelo id
app.put("/api/v1/lists/edit/:id", (req, res) => {
    const id = req.params.id;
    Lista.findByIdAndUpdate(id, { title: req.body.title }, err => {
    if (err) return res.send(500, err);
        res.send("Atualizado com sucesso");
    });
});

// Deletar Lista
app.delete("/api/v1/lists/remove/:id",(req, res) => {
    const id = req.params.id;
    console.log(id);
    Lista.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
        res.send("Removido com sucesso.");
    });
});

}