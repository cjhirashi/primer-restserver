//===============================================================================================================
//TITLE: AUTH CONTROLLER
//DESCRIPTION: CONTROLADOR DE INICIO DE SESION
//AUTH: Carlos Jimenez @cjhirashi
//===============================================================================================================

//LIBRERIAS GLOBALES
const { response } = require('express');
const bcryptjs = require('bcryptjs');

//LIBRERIAS LOCALES
const User = require('../models/user.model');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');
const { messageStructure } = require('../helpers/object.helpers');

//_______________________________________________________________________________________________________________
//LOGIN POR EMAIL
const logIn = async( req, res = response ) => {
    //CONSULTA DE PARAMETROS
    const { email, password } = req.body;

    try {
        //VERIFICAR SI EL USUARIO EXISTE
        const user = await User.findOne({ email });

        //USUARIO NO EXISTE
        if (!user) {
            const response = messageStructure(
                status = 400,
                msEn = 'Username dont register...',
                msEs = 'Usuario no registrado...'
            );
            return res.status(response.status).json({
                response
            });
        }

        //USURIO INACTIVO
        if (user.state == false ) {
            const response = messageStructure(
                status = 400,
                msEn = 'Username inactiv...',
                msEs = 'Usuario inactivo...'
            );
            return res.status(response.status).json({
                response
            });
        }

        //USUARIO ACTIVO CON CUENTA DE GOOGLE
        if (user.google == true) {
            const response = messageStructure(
                status = 400,
                msEn = 'Username register on google...',
                msEs = 'Usuario registrado en google...'
            );
            return res.status(response.status).json({
                response
            });
        }

        //VERIFICACION DE PASSWORD
        const validPassword = bcryptjs.compareSync( password, user.password );

        //PASSWORD NO VALIDO
        if ( !validPassword ) {
            const response = messageStructure(
                status = 400,
                msEn = 'invalid password...',
                msEs = 'Password invalido...'
            );
            return res.status(response.status).json({
                response
            });
        }

        //GENERACION DE PASSWORD
        const token = await generateJWT( user.id );

        return res.json({
            usuario: user.email,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error interno, hable con el administrador'
        })
    }

}

//_______________________________________________________________________________________________________________
//LOGON POR EMAIL
const logOn = async(req, res = response) => {

    const { name, email, password, vpassword } = req.body;
    const role = 'VIEWER_ROLE';
    const user = new User({ name, email, role });

//    if ( password !== vpassword ) {
//        const response = messageStructure(
//            status = 400,
//            msEn = 'Password not match...',
//            msEs = 'Password no corresponde...'
//        );
//        return res.status(response.status).json({
//            response
//        });
//    }

    //ENCRIPTAR CONTRASEÑA
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    //CREAR USUARIO EN BASE DE DATOS
    await user.save();

    const response = messageStructure(
        status = 200,
        msEn = 'User successful...',
        msEs = 'Usuario creado exitosamente...',
        erEn = null, 
        erEs = null, 
        total= null, 
        from = null, 
        limit = null, 
        object = user
    );
    return res.status(response.status).json({
        response
    });
}

//_______________________________________________________________________________________________________________
//LOGIN POR GOOGLE
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

//_______________________________________________________________________________________________________________
//EXPORTACION DE MODULOS DE CONTROL
module.exports = {
    logIn,
    logOn,
    googleSignIn
}