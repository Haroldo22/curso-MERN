const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("../utils/jwt");

//se establecen las funciones en este apartado de controlador que luego seran importadas a las rutas donde se asignaran a un endpoint

//funcion asincrona para registrar a un usuario
async function register(req, res) {
  //en req.body es donde se guardan los los datos obtenidos de la consulta para aqui obtenerlos, guardarlos en variables y operar con ellos
  const { firstname, lastname, email, password } = req.body;

  console.log("Request body: ");
  console.log(email);
  console.log(password);

  //verifica que en email y password existan datos
  if (!email) res.status(400).send({ msg: "El email es obligatorio" });
  if (!password) res.status(400).send({ msg: "La contraseña es obligatoria" });

  //se crea una constante de usuario basada en el modelo de usuario en la carpeta ../models/user
  //en este nuevo usuario se declara que el valor de las keys del modelo seran los valores obtenidos en el post de la funcion, por recomendacion las variables creadas anteriormente
  //tendran el mismo nombre que las keys del modelo del usuario, asi las keys que se les asigne el valor de la variable obtenida en la funcion solo se deja con el propio nombre de la variable
  //local, tambien se puede hacer funciones como en el caso de email.tolowercase para modificar el dato obtenido, o tambien en el caso del role establecer de manera predeterminada un valor
  //a una key sin que el usuario tenga oportunidad de cambiarlo, como es en el caso del role, ya que todos aquellos que se registren de esa manera seran en automatico solo usuarios
  const user = new User({
    firstname,
    lastname,
    email: email.toLowerCase(),
    role: "user",
    active: true,
  });

  //este es un metodo para encriptar la password, haciendo que cuando se envie a la base de datos solo se vea la password encriptada
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  user.password = hashPassword;

  //desde el index la conexion a la base de datos esta establecida, por lo que aqui se usa la funcion save() para guardar los datos del modelo creado en la base de datos, si existe error
  //el servidor mandara un mensaje de error, en caso contrario para el ejemplo imprimira en consola los valores que se enviaron a la base de datosS
  await user.save((error, userStorage) => {
    if (error) {
      res.status(400).send({ msg: "Error al registrar usuario" });
    } else {
      res.status(200).send(userStorage);
    }
  });
}

function login(req, res) {
  //creamos las variables email y password con los valores guardados en req.body que fue lo que el usuario ingresa cuando esta funcion se ejecuta
  const { email, password } = req.body;

  //comprueba que los valores email y password no sean nulos
  if (!email) res.status(400).send({ msg: "El email es obligatorio" });
  if (!password) res.status(400).send({ msg: "La contraseña es obligatoria" });

  //funcion para asegurar que el email esta en letras chicas
  const emaillowerCase = email.toLowerCase();

  //funcion findOne de mongoose para mongodb para solo buscar un documento de acuerdo al parametro establecido
  User.findOne({ email: emaillowerCase }, (error, userStorage) => {
    if (error) {
      res.status(500).send({ msg: "Error del servidor" });
    } else {
      //funcion de bcrypt para comparar la password ingresada por el usuario de tipo texto plano con la password encriptada de la base de datos
      bcrypt.compare(password, userStorage.password, (bcryptError, check) => {
        if (bcryptError) {
          //verifica que si existe un error en la comparacion se envia un error al servidor
          res.status(500).send({ msg: "Error del servidor" });
        } else if (!check) {
          //en caso de que la comparacion sea falsa se envia un error al servidor
          res.status(400).send({ msg: "Contraseña incorrecta" }); //recomendacion de solo poner error de servidor, nunca avisar que el usuario o password es erroneo
        } else if (!userStorage.active) {
          //verifica que el atribudo de actividad del usuario sea activo
          res.status(401).send({ msg: "Usuario inactivo o no autorizado" });
        } else {
          //esta es la condicion donde si no existe ningun error en la comprobacion se valida el login
          res.status(200).send({
            access: jwt.createAccesToken(userStorage),
            refresh: jwt.createRefreshToken(userStorage), //como validacion crea el access token para mantener la sesion iniciada del usuario, cuando el token expire en el tiempo
            //establecido en ../util/jwt se cierra la sesion
          });
        }
      });
    }
  });
}

function refreshAccessToken(req, res) {
  const { token } = req.body;

  if (!token) res.status(400).send({ msg: "token requerido" });

  const { user_id } = jwt.decoded(token);

  User.findOne({ _id: user_id }, (error, userStorage) => {
    if (error) {
      res.status(500).send({ msg: "Error del servidor" });
    } else {
      res.status(200).send({
        accesstoken: jwt.createAccesToken(userStorage),
      });
    }
  });
}

module.exports = {
  register,
  login,
  refreshAccessToken,
};
