const bcrypt = require('bcryptjs')
const User = require('../models/user')
const image = require('../utils/image')

//funcion para obtener el dato del usuario en la sesion actual
async function getMe(req, res){
    const { user_id } = req.user

    const response = await User.findById(user_id)

    if(!response){
        res.status(400).send({ msg: "No se ha encontrado al usuario"})
    } else{
        res.status(200).send(response)
    }
}

//funcion para obtener usuarios de acuerdo a un filtro, si no se establece que el usuario debe estar activo o no se obtendran a todos, si se establece que active sea true o false se obtendran
//los datos con ese filtro
async function getUser(req, res){
    const { active } = req.query
    let response = null

    if(active === undefined){
        response = await User.find()
    }else{
        response = await User.find({ active })
    }

    res.status(200).send(response)
}

//funcion para crear usuario
async function createUser(req, res){
    const { password } = req.body
    const user = new User({ ...req.body, active: false })

    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt)
    user.password  = hashPassword

    if(req.files.avatar){
        const imagePath = image.getFilePath(req.files.avatar)
        user.avatar = imagePath
    }

    user.save((error, userStorage)=>{
        if(error){
            res.status(400).send({ msg: "Error al crear el usuario"})
        } else{
            res.status(201).send(userStorage)

        }
    })
}

//actualizacion del usuario
async function updateUser(req, res){
    const { id } = req.params
    const userData = req.body

    if(userData.password){
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(userData.password, salt)
        userData.password = hashPassword
    }else{
        delete userData.password
    }


    if(req.files.avatar){
        const imagePath = image.getFilePath(req.files.avatar)
        userData.avatar = imagePath
    }

    User.findByIdAndUpdate({_id: id}, userData, (error)=>{
        if(error){
            res.status(400).send({msg: "Error al actualizar el usuario"})
        }else{
            res.status(200).send({msg: "Actualizacion correcta"})

        }
    })
}

async function deleteUser(req, res){
    const { id } = req.params

    User.findByIdAndDelete(id, (error)=>{
        if(error){
            res.status(400).send({ msg: "Error al eliminar el usuario"})
        }else{
            res.status(200).send({ msg: "Usuario eliminado"})
        }
    })
}

module.exports = {
    getMe,
    getUser,
    createUser,
    updateUser,
    deleteUser
}