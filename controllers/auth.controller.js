const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user.model');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {
        // Verificar si el email existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        // Verificar si el usuario está activo
        if (user.state == false ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - inactivo'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        // Generar el JWT
        const token = await generateJWT( user.id );

        res.json({
            usuario: user.email,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error interno, hable con el administrador'
        })
    }

}

module.exports = {
    login
}