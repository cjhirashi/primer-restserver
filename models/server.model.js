const express = require('express'); // Servidor de express
const cors = require('cors'); // Conexión a milwares
const { mongoConection } = require('../database/mongo.db'); // Conexión a base de datos

class Server {

    constructor() {
        this.app = express();
        this.port =process.env.PORT;

        // Conexión a base de datos
        this.dataBase();

        // Middlewares
        this.middlewares();

        // Rutas de aplicación
        this.routes();
    }

    async dataBase() {
        await mongoConection();
    }

    middlewares() {
        // CORS
        this.app.use( cors() ); // Uso de milwares

        // Lectura y parseo del body
        this.app.use( express.json() ); // Uso de archivos JSON

        // Directorio público
        this.app.use( express.static('public') ); // Uso de rutas publicas
    }

    routes() {
        this.app.use('/api/users', require('../routes/users.route'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto: ${this.port}`);
        })
    }
}

module.exports = Server;