const mongoose = require('mongoose')

//creacion del esquema para el modelo de la base de datos
const UserSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    role: String,
    active: Boolean,
    avatar: String,
})

module.exports = mongoose.model('user', UserSchema)