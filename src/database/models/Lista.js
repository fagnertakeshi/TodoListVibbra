const mongoose = require('mongoose');
const Schema= mongoose.Schema;
//const Item= require('./Item')

const ListaSchema = new mongoose.Schema({
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
    ref:"user"
    },
},

)
module.exports = mongoose.model('Lista',ListaSchema);