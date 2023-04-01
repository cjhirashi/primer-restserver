const { response, request  } = require('express');
const bcryptjs = require('bcryptjs');

const User =  require('../models/user.model');

// OBTENERA USUARIOS
const usersGet = async (req = request, res = response) => {

    // Consultas
    const { limit = 5, from = 0 } = req.query;
    const query = {state: true};

    const total = await User.countDocuments(query);
    const users = await User.find(query)
        .skip(Number(from))
        .limit(Number(limit));


    //const [ total, users ] = await Promise.all([
    //    User.countDocuments(query),
    //    User.find(query)
    //    .skip(Number(from))
    //    .limit(Number(limit))
    //]);

    const rango = `Registro ${from} a ${Number(from) - 1 + Number(limit)}`;

    res.json({
        total,
        rango,
        users
    });
}
const userGet =async (req = request, res = response) => {
    // Parametros
    const { id } = req.params;

    // Buscar registro por ID
    const user = await User.findById(id);

    // Validar autentificación de usuario
    const authenticatedUser = req.user;

    res.json({
        user
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
    usersPut,
    usersPost,
    usersPatch,
    usersDelete
};