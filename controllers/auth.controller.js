const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user.model');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async( req, res = response ) => {

    const { id_token } = req.body;

    try {

        const { name, given_name, family_name, picture, email } = await googleVerify( id_token );

        let user = await User.findOne({ email });

        if ( !user ) {
            const data = {
                name: name,
                email: email,
                password: '---',
                img: picture,
                google: true
            }

            user = new User( data );
            await user.save();
        }

        if ( !user.state ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, cuenta bloqueada...'
            })
        }

        // Generar JWT
        const token = await generateJWT( user.id );

        const googleUser = { name, email };

        res.json({
            googleUser,
            token,
            user,
            msg: 'Acceso concedido...'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'El Token no se pudo verificar'
        })
    }

}

module.exports = {
    login,
    googleSignIn
}