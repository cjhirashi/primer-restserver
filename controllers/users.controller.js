const { response, request  } = require('express');
const bcryptjs = require('bcryptjs');

const User =  require('../models/user.model');


const usersGet = (req = request, res = response) => {

    const params = req.query;

    res.json({
        msg: 'get API - Controller'
    });
}

const usersPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - Controller',
        id
    });
}

const usersPost = async(req, res = response) => {

    const { name, email_address, password, role } = req.body;
    const user = new User({ name, email_address, role });

    // Verificar si correo existe
    const mailExists = await User.findOne({ email_address });
    if ( mailExists ) {
        return res.status(400).json({
            msg: 'Este correo ya existe'
        });
    }

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

const usersDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - Controller'
    });
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersPatch,
    usersDelete
};