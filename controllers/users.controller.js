//========================================================
//TITLE: USER CONTROLLER
//DESCRIPTION: CONTROLADOR DE REGISTRO USUARIOS
//AUTH: Carlos Jimenez @cjhirashi
//========================================================

//LIBRERIAS
const { response, request  } = require('express');
const bcryptjs = require('bcryptjs');
const User =  require('../models/user.model');
const {
    objectFrom,
    objectLimit,
    replyMessageGetObjects,
    replyMessageGetObject,
    replyMessagePutObject
} = require('../helpers/object.helpers');

//OBTENER LISTA DE USUARIOS
const usersGet = async (req = request, res = response) => {
    //Consulta de parametros
    const { limit = 5, from = 1, role = '' } = req.query;

    //Adecuación de parametros
    const fromQuery = objectFrom(from);
    const limitQuery = objectLimit(limit);

    //Consulta de registros
    //Parametros de consulta
    let query;
    if (role == '') {
        query = {state: true};
    }else{
        query = {
            state: true,
            role
        };
    }
    //Total de registros que cumplen con consulta
    const total = await User.countDocuments(query);
    //Lista de registros que cumplen con consulta
    const users = await User.find(query)
        .skip(Number(fromQuery))
        .limit(Number(limitQuery));

    //Gestor de mensaje de respuesta
    const response = replyMessageGetObjects(total,from,limitQuery,users);

    //Respuesta de sistema
    res.status(response.status).json({
        response
    });
}

//OBTENER USUARIO
const userGet = async (req = request, res = response) => {
    //Consulta de parametros
    const { id } = req.params;

    //Busqueda de registro por ID
    const user = await User.findById(id);

    //Validar autentificación de usuario
    //const authenticatedUser = req.user;

    //Gestor de mensaje de respuesta
    const response = replyMessageGetObject(user);

    //Respuesta de sistema
    res.status(response.status).json({
        response
    });

}

//ACTUALIZAR USUARIO
const usersPut = async (req, res = response) => {
    //Consulta de parametros
    const { id } = req.params;

    //Consulta de cuerpo de la petición
    //const { uid, password, google, email, ...resto } = req.body;
    let { name, password, img, role } = req.body;

    //Encriptacion de password
    if ( password ) {
        const salt = bcryptjs.genSaltSync();
        password = bcryptjs.hashSync( password, salt );
    }

    //const data = {name, password, img, role};

    const user = await User.findByIdAndUpdate( id, {name, password, img, role} );

    //Gestor de mensaje de respuesta
    const response = replyMessagePutObject(user);

    //Respuesta de sistema
    res.status(response.status).json({
        response
    });
}

//CREAR USUARIO
const usersPost = async(req, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, role });

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    // Crear usuario en BD
    await user.save();

    res.json({
        user

    });
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controller'
    });
}

const usersDelete = async (req, res = response) => {

    const { id } = req.params;

    // Borrado de la base de datos
    //const user = await User.findByIdAndDelete( id );

    // Borrardo de las consultas
   // const user = await User.findByIdAndUpdate( id, { state: false });

    //Validar autentificación de usuario
    //const authenticatedUser = req.user;

    res.json({
        msg: 'Ok'
    });
}

module.exports = {
    usersGet,
    userGet,
    usersPut,
    usersPost,
    usersPatch,
    usersDelete
};