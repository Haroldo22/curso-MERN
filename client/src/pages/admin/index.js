export * from "./Auth"
export * from "./Users"
export * from "./Blog"
export * from './Courses'
export * from './Menu'
export * from './Newsletter'

//la carpeta pages es donde se guardaran todas las paginas o componentes que se usaran para la aplicacion. para facilitar la organizacion primero se ordena por secciones las paginas, en el
//momento de escribir esto solo estaba la seccion de paginas para la administracion y otra para la web general a los usuarios. dentro de estas carpetas van contenidos las paginas o componentes
//que se usaran, en el caso de admin ya tiene dos carpetas, una llamada Auth que se mostrara al momento de logearse y otra llamada Users que se mostrara con la condicion de que el usuario se
//haya logeado previamente. cada una de estas carpetas tiene un archivo index.js que sirve, como su nombre lo indica, un indice de los componentes que estamos exportando, y en las carpetas de
//mayor nivel nuevamente se crea otro index.js exportando los componentes (previamente exportados en sus respectivos archivos index.js) de las carpetas hijo.
//de esta manera cuando se importa en, por ejemplo, los archivos de las rutas, se hace un deconstructuring de los componentes haciendo referencia unicamente a la carpeta padre de todos y 
//nombrando uno por uno los componentes en un mismo deconstructuring

// sin embargo, como en la carpeta de admin existen componentes con restricciones, no se creo un ultimo index fuera de todas las carpetas para asi mantenerlos seguros de ser alcanzados sin antes
//tener la autorizacion