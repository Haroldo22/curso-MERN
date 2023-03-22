const Menu = require('../models/menu')

async function createMenu(req, res){
    const menu = new Menu(req.body)

    menu.save((error, menuStorage)=>{
        if(error){
            res.status(400).send({ msg: "Error al crear el menu"})
        } else{
            res.status(200).send(menuStorage)
        }
    })
}

async function getMenus(req, res){
    //los req.query se obtienen de las variables definidas en la ruta. ejemplo: /api?active=true      a partir del signo de interrogacion los datos que aparezcan seran variables
    const{ active } = req.query
    let response = null

    if(active === undefined){
        response = await Menu.find().sort({ order: "ascending"})
    }else{
        response = await Menu.find({ active }).sort({ order: "ascending"})
    }

    if(!response){
    res.status(400).send({msg: "No se ha encontrado ningun menu"})
    }else{
    res.status(200).send(response)
    }
}

async function updateMenu(req, res){
    //los req.params son los que se obtienen como parte de la ruta del endpoint, es un tipo variable pero no, ejemplo: /api/123456      en este caso se obtendrian los datos '123456' del final de la ruta
    const { id } = req.params
    //los req.body se obtienen del cuerpo de la peticion, es decir, si en un post o get se estan mandando o recibiendo datos, con esta funcion obtendras los datos que se esten transfiriendo
    const menuData = req.body

    Menu.findByIdAndUpdate({_id: id}, menuData, (error)=>{
        if(error){
            res.status(400).send({msg: "Error al actualizar los datos del usuario"})
        } else{
            res.status(200).send({msg: "Actualizacion correcta"})
        }
    })
}

//
//codigo ejemplo para el registro de asistencias
async function registroAsistencias(req, res){
    const AsistenciaModel = null //ejemplo del modelo de asistencias para hacer la solicitud a la base de datos
    const asistencias = new AsistenciaModel(req.body)

    asistencias.forEach(element =>{
        const { matricula, fecha } = asistencias
        AsistenciaModel.find({ matricula, fecha}, (error, asistenciaStorage) =>{
            if(asistenciaStorage){
                res.status(500).send({ msg: "Error, la matricula ya tiene una asistencia registrada para el dia de hoy"})
            } else{
                const filaAsistencia = new AsistenciaModel(element)
                filaAsistencia.save()
            }
        })
    })
}
//fin del ejemplo
//

async function deleteMenu(req, res){
    const { id } = req.params

    Menu.findByIdAndDelete(id, (error)=>{
        if(error){
            res.status(400).send({ msg: "Error al eliminar el menu"})
        }else{
            res.status(200).send({ msg: "Menu eliminado"})
        }
    })
}

module.exports = {
    createMenu,
    getMenus,
    updateMenu,
    deleteMenu
}