const express = require('express')
const AuthController = require('../controllers/auth')

const api = express.Router()

//se establece el tipo de protocolo http con los argumentos del endpoint y la funcion relacionada a ese endpoint
api.post('/auth/register', AuthController.register)
api.post('/auth/login', AuthController.login)
api.post("/auth/refresh_access_token", AuthController.refreshAccessToken)

module.exports = api