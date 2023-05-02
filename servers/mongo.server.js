//===============================================================================================================
//TITLE: MONGO SERVER
//DESCRIPTION: SERVIDOR DE DATOS CON BASE DE DATOS EN MONGO
//AUTH: Carlos Jimenez @cjhirashi
//===============================================================================================================

//LIBRERIAS GLOBALES
const express = require('express'); //LIBRERIAS DE EXPRESS PARA SERVIDOR
const cors = require('cors'); //GESTOR DE MILWARES

//LIBRERIAS LOCALES
const { mongoConection } = require('../database/mongo.db'); //BASE DE DATOS MONGO

//_______________________________________________________________________________________________________________
//SERVIDOR DE DATOS
class Server {

    //CONSTRUCTOR DE CLASE
    constructor() {
        this.app = express();
        this.port =process.env.PORT;

        //RUTAS PARA CONSULTA DE REGISTROS
        this.apiV = '/api';
        this.usersPath = `${this.apiV}/users`;
        this.authPath = `${this.apiV}/auth`;
        this.productsPath = `${this.apiV}/products`;
        this.projectsPath = `${this.apiV}/projects`;
        this.systemsPath = `${this.apiV}/systems`;
        this.subsystemsPath = `${this.apiV}/subsystems`;
        this.elementsPath = `${this.apiV}/elements`;
        this.variablesPath = `${this.apiV}/variables`;

        //INICIO DE CONEXION A BASE DE DATOS
        this.dataBase();

        //INICIO DE CONEXION A MIDDLEWARES
        this.middlewares();

        //INICIO DE CONEXION A RUTAS DE CONSULTA DE DATOS
        this.routes();
    }

    //_______________________________________________________________________________________________________________
    //CONEXION A BASE DE DATOS
    async dataBase() {
        await mongoConection();
    }

    //_______________________________________________________________________________________________________________
    //CONEXION A MIDDLEWARES
    middlewares() {
        //MIDDLEWARES DE CONSULTAS
        this.app.use( cors() ); // Uso de milwares

        //LECTURA Y PARSEO DE ARCHIVOS JSON
        this.app.use( express.json() ); // Uso de archivos JSON

        //DIRECTORIO PUBLICO
        this.app.use( express.static('public') ); // Uso de rutas publicas
    }

    //_______________________________________________________________________________________________________________
    //CONEXION A RUTAS DE ACCESO PARA CONSULTASS
    routes() {

        this.app.use(this.authPath, require('../routes/auth.route'));
        this.app.use(this.usersPath, require('../routes/users.route'));

    }

    //_______________________________________________________________________________________________________________
    //APERTURA DE SERVIDOR
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto: ${this.port}`);
        })
    }
}

//_______________________________________________________________________________________________________________
//EXPORTACION DE MODULOS DE CONTROL
module.exports = Server;