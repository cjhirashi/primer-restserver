//===============================================================================================================
//TITLE: APP
//DESCRIPTION: ACTIVACION DE LA APP
//AUTH: Carlos Jimenez @cjhirashi
//===============================================================================================================

//LIBRERIAS GLOBALES
require('dotenv').config(); //VARIABLES GLOBALES

//LIBRERIAS LOCALES
const Server = require('./servers/mongo.server');

//_______________________________________________________________________________________________________________
//CREACION DE SERVIDOR
const server = new Server();

//_______________________________________________________________________________________________________________
//ACTIVACION DE SERVIDOR
server.listen();