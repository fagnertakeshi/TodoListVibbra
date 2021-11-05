const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const todoTaskSchema = new mongoose.Schema({
content: {
type: String,
required: true
},
date: {
type: Date,
default: Date.now
},
owner: {
    type: Schema.Types.ObjectId,
    ref:"User"
    },
})
module.exports = mongoose.model('TodoTask',todoTaskSchema);