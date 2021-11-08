const router = require('express').Router()

// Importe o passport
const passport = require('passport');
const express = require("express");

const Item = require("../../database/models/Item");

module.exports = app => { 

app.use("/static", express.static("static"));
app.use(express.urlencoded({ extended: true })); 

app.use('/item/listar', passport.authenticate('jwt', { session: false }), router)
app.use('/item/insert', passport.authenticate('jwt', { session: false }), router)
app.use('/item/edit/:id', passport.authenticate('jwt', { session: false }), router)
app.use('/item/remove/:id', passport.authenticate('jwt', { session: false }), router)

app.post('/api/v1/lists/:Listid/item/',async (req, res) => {

// Inserir Lista
const item = new Item({
    id_lista: req.params.Listid,
    title: req.body.title,
    user_id: req.body.owner
});
try {
    await item.save();
    res.send("Inserido com sucesso.");
    } catch (err) {
    res.redirect("Erro ao atualizar.");
    }
});
        
// Listar todas os itemns
app.get("/api/v1/lists/:Listid/item/", (req, res) => {
    Item.find({id_lista: req.params.Listid}, (err, items) => {
        res.send({ Item: items });
    });
});    
    
// Atualizar item pelo id
app.route("/api/v1/lists/:Listid/item/edit/:id")
.get((req, res) => {
    const id = req.params.id;
    Item.find({}, (err, items) => {
    res.send({ Item: items, idLista: id });
    });
})
.post((req, res) => {
    const id = req.params.id;
    Item.findByIdAndUpdate(id, { content: req.body.content }, err => {
    if (err) return res.send(500, err);
        res.send("Atualizado com sucesso");
    });
});

// Deletar Item
app.route("/api/v1/lists/:Listid/item/remove/:id").get((req, res) => {
    const id = req.params.id;
    Item.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
        res.send("Removido com sucesso.");
    });
});

}