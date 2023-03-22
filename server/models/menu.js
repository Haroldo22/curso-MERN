const mongoose = require('mongoose')

const menuSchema = mongoose.Schema({
    title: String,
    path: {
        type: String,
        unique: true
    },
    order: Number,
    active: Boolean
})

module.exports = mongoose.model("Menu", menuSchema)