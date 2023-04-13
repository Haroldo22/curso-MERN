const mongoose = require("mongoose");
const app = require("./app");
const {
  DB_HOST,
  DB_PASSWORD,
  DB_USER,
  API_VERSION,
  IP_SERVER,
} = require("./constants");

const PORT = process.env.POST || 3977;

//se inicia la conexion con la base de datos y con el servidor de la aplicacion pasando las variables declaradas en ./constants.js
async function main() {
  await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`);

  app.listen(PORT, () => {
    console.log(`http://${IP_SERVER}:${PORT}/API/${API_VERSION}`);
  });
}

//ejecuta la funcion de arriba para establecer la conexion
main().catch((err) => console.log(err));
