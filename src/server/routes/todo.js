const router = require('express').Router()

// Importe o passport
const passport = require('passport');
const express = require("express");

const TodoTask = require("../../database/models/TodoTask");

module.exports = app => { 

app.use("/static", express.static("static"));
app.use(express.urlencoded({ extended: true })); 

app.use('/listar', passport.authenticate('jwt', { session: false }), router)
app.use('/insert', passport.authenticate('jwt', { session: false }), router)
app.use('/edit/:id', passport.authenticate('jwt', { session: false }), router)
app.use('/remove/:id', passport.authenticate('jwt', { session: false }), router)

app.set("view engine", "ejs");    

app.post('/insert',async (req, res) => {
const todoTask = new TodoTask({
    content: req.body.content
});
try {
    await todoTask.save();
    res.redirect("/");
    } catch (err) {
    res.redirect("/");
    }
});
        
// GET METHOD
app.get("/listar", (req, res) => {
    TodoTask.find({}, (err, tasks) => {
        res.send({ todoTasks: tasks });
    });
});
    
    
//UPDATE
app.route("/edit/:id")
.get((req, res) => {
    const id = req.params.id;
    TodoTask.find({}, (err, tasks) => {
    res.send({ todoTasks: tasks, idTask: id });
    });
})
.post((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
    if (err) return res.send(500, err);
        res.redirect("/");
    });
});

//DELETE
app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
        res.redirect("/");
    });
});

}