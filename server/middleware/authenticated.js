const jwt = require('../utils/jwt')

//esto es un middleware para evitar que usuarios o no usuarios con token invalidos o expirados puedan acceder al endpoint al que se le asigne este mdw
function asureAuth(req, res, next){
    if(!req.headers.authorization){
        return res.status(400).send({msg: "La peticion no tiene la cabecera de autentificacion"})
    }

    const token = req.headers.authorization.replace("Bearer ", "")

    try {
        const payload = jwt.decoded(token)
        const { exp } = payload
        const currentDate = new Date().getTime()

        if(exp <= currentDate){
            return res.status(400).send({ msg: "Token ha expirado"})
        }

        req.user = payload
        next()
    } catch (error) {
        return res.status(400).send({msg: "Token invalido"})
    }
}

module.exports = {
    asureAuth
}