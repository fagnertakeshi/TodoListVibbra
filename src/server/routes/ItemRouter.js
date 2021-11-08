const router = require('express').Router()

// Importe o passport
const passport = require('passport');
const express = require("express");

const Item = require("../../database/models/Item");

module.exports = app => { 


app.use(express.urlencoded({ extended: true })); 

app.use('/api/v1/lists/', passport.authenticate('jwt', { session: false }), router)


router.post('/:Listid/item/',async (req, res) => {

// Inserir Lista
const item = new Item({
    id_lista: req.params.Listid,
    title: req.body.title,
    user_id: req.body.owner
});
try {
    await item.save();
    res.send(item);
    } catch (err) {
    res.redirect("Erro ao atualizar.");
    }
});
        
// Listar todas os itemns
router.get("/:Listid/item/", (req, res) => {
    Item.find({id_lista: req.params.Listid}, (err, items) => {
        res.send({ Item: items });
    });
});    
    
// Atualizar item pelo id
router.put("/:Listid/item/edit/:id",(req, res) => {
    console.log('entrei aqui');
    const id = req.params.id;
    console.log(id);
    Item.findByIdAndUpdate(id, { title: req.body.title, user_id:req.body.user_id }, (err,items) => {
    if (err) return res.send(500, err);
        res.send({ Item: items });
    });
});

// Deletar Item
router.delete("/:Listid/item/remove/:id",(req, res) => {
    const id = req.params.id;
    Item.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
        res.send("Removido com sucesso.");
    });
});

}