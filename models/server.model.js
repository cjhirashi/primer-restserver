const express = require('express');
const cors = require('cors');
const { dbConnetion } = require('../database/config.db');

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
        await dbConnetion();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio público
        this.app.use( express.static('public') );
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