const { response, request  } = require('express');
const bcryptjs = require('bcryptjs');

const User =  require('../models/user.model');
const {
    objectQuery,
    replyMessageGetObjects,
    replyMessageGetObject
} = require('../helpers/object-response.helper');

// OBTENERA USUARIOS
const usersGet = async (req = request, res = response) => {

    // Parametros para consulta
    const { limit = 5, from = 1 } = req.query;

    const fromQuery = objectQuery(from);

    // Consulta de registros
    const query = {state: true};
    const total = await User.countDocuments(query);
    const users = await User.find(query)
        .skip(Number(fromQuery))
        .limit(Number(limit));

    const response = replyMessageGetObjects(total,from,limit,users);

    res.status(response.status).json({
        response
    });
}

const userGet = async (req = request, res = response) => {
    // Parametros
    const { id } = req.params;

    // Buscar registro por ID
    const user = await User.findById(id);

    // Validar autentificación de usuario
    const authenticatedUser = req.user;

    console.log(authenticatedUser);

    const response = replyMessageGetObject(user);

    res.status(response.status).json({
        response
    });

}

const userGetEmail = async (req = request, res = response) => {
    console.log('Estoy aqui');
    

    res.status(response.status).json({
        msg:'holaaaa'
    });

}

// ACTUALIZAR USUARIOS
const usersPut = async (req, res = response) => {

    // Parametros
    const { id } = req.params;

    // Cuerpo
    const { _id, password, google, email, ...resto } = req.body;

    if ( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, resto );

    res.json({
        msg: `Usuario <${user.email}> actualizado`
    });
}

// AGREGAR USUARIOS
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
    const user = await User.findByIdAndUpdate( id, { state: false });

    const authenticatedUser = req.user;

    res.json({
        user
    });
}

module.exports = {
    usersGet,
    userGet,
    userGetEmail,
    usersPut,
    usersPost,
    usersPatch,
    usersDelete
};