const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const ItemSchema = new mongoose.Schema({
title: {
type: String,
required: true
},
description: {
    type: String,
    required: false
    },
user_id: {
    type: Schema.Types.ObjectId,
    ref:"user"
    },
id_lista: {
        type: Schema.Types.ObjectId,
        ref:"Lista"
 },    

})
module.exports = mongoose.model('Item',ItemSchema);