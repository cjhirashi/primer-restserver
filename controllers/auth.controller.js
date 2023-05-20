//===============================================================================================================
//TITLE: AUTH CONTROLLER
//DESCRIPTION: CONTROLADOR DE AUTENTIFICACION DE USUARIO
//AUTH: Carlos Jimenez @cjhirashi
//===============================================================================================================

//LIBRERIAS GLOBALES
const { response } = require('express');
const bcryptjs = require('bcryptjs');

//LIBRERIAS LOCALES
const { User } = require('../models');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');
const { messageError, messageObject, messageToken, msgObjectCreate } = require('../helpers/messege.helpers');


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
            const response = messageError(
                404,
                'Username dont register...',
                'Usuario no registrado...'
            );
            return res.status(response.status).json({
                response
            });
        }

        //USURIO ESTADO INACTIVO
        if (user.state == false ) {
            const response = messageError(
                401,
                'Username inactive...',
                'Usuario inactivo...'
            );
            return res.status(response.status).json({
                response
            });
        }

        //USUARIO ACTIVO CON CUENTA DE GOOGLE
        if (user.google == true) {
            const response = messageError(
                401,
                'Username register on google...',
                'Usuario registrado en google...'
            );
            return res.status(response.status).json({
                response
            });
        }

        //VERIFICACION DE PASSWORD
        const validPassword = bcryptjs.compareSync( password, user.password );

        //PASSWORD NO COINCIDE
        if ( !validPassword ) {
            const response = messageError(
                401,
                'Wrong password...',
                'Password incorrecto...'
            );
            return res.status(response.status).json({
                response
            });
        }

        //GENERACION DE TOKEN PARA USUARIO
        const token = await generateJWT( user.id );

        //RESPUESTA DE ACCESO EXITOSO
        const response = messageToken(
            202,
            'Successful login...',
            'Acceso exitoso...',
            token
        );
        return res.status(response.status).json({
            response
        })
    } catch (error) {
        //ERROR DE SERVIDOR
        const response = messageError(
            500,
            'Server error...',
            'Error de servidor...'
        );
        return res.status(response.status).json({
            response
        });
    }

}

//_______________________________________________________________________________________________________________
//LOGON POR EMAIL
const logOn = async(req, res = response) => {

    //CONSULTA DE PARAMETROS
    const { name, email, password } = req.body;
    //const role = 'VIEWER_ROLE';

    //VALIDACION SI USUARIO YA EXISTE
    const userExist = await User.findOne({email});

    if ( userExist ) {
        const response = messageError( 
            400,
            'User already exist...',
            'El usuario ya existe...'
        )
        return res.status(response.status).json({
            response
        })
    }

    //CREACION DE USUARIO EN EL SERVIDOR
    const user = new User({ name, email });

    //ENCRIPTACION DE CONTRASEÑA
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    //GUARDAR USUARIO EN LA BASE DE DATOS
    await user.save();

    //MENSAJE DE CREACION DE USUARIO
    const response = msgObjectCreate( user );

    return res.status(response.status).json(response);
}

//_______________________________________________________________________________________________________________
//LOGIN POR GOOGLE
const googleSignIn = async( req, res = response ) => {

    //CONSULTA DE PARAMETROS
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