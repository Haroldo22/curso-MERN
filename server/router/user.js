const express = require('express')
const multiparty = require('connect-multiparty')
const UserController = require('../controllers/user')
const md_auth = require('../middleware/authenticated')

const md_upload = multiparty({ uploadDir: '../server/uploads/avatar'})
const api = express.Router()

//                  justo esta parte de abajo de md_auth.asureAuth es el middleware que se usa para que usuarios o no usuarios con token invalido no accedan al endpoint
api.get('/user/me', [md_auth.asureAuth], UserController.getMe)
api.get('/users', [md_auth.asureAuth], UserController.getUser)
api.post('/user', [md_auth.asureAuth, md_upload], UserController.createUser)
api.patch('/user/:id', [md_auth.asureAuth, md_upload], UserController.updateUser)
api.delete('/user/:id', [md_auth.asureAuth], UserController.deleteUser)

module.exports = api 