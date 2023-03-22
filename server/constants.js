//se declaran los valores constantes para evitar errores cuando uno de estos valores cambien, asi solo se modifican en este archivo. estos valores son los necesarios para la conexion
//con la base de datos y el valor secreto para la jsonwebtoken que funciona para la autenticacion de usuarios

const DB_USER = 'admin'
const DB_PASSWORD = 'admin123456'
const DB_HOST = 'cluster0.rbmzth8.mongodb.net'

const API_VERSION = 'v1'
const IP_SERVER = 'localhost'

const JWT_SECRET_KEY = 'jkf98abiascmay8curtqapfi9'

module.exports = {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    API_VERSION,
    IP_SERVER,
    JWT_SECRET_KEY
}