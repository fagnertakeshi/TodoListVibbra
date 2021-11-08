const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const ListaSchema = new mongoose.Schema({
title: {
type: String,
required: true
},
owner: {
    type: Schema.Types.ObjectId,
    ref:"user"
    },
},

)
module.exports = mongoose.model('Lista',ListaSchema);