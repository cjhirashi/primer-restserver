//===============================================================================================================
//TITLE: VALIDATE JWT
//DESCRIPTION: VALIDADOR DE JSON WEB TOKEN
//AUTH: Carlos Jimenez @cjhirashi
//===============================================================================================================

//LIBRERIAS GLOBALES
const { request } = require('express');
const jwt = require('jsonwebtoken');

//LIBRERIAS LOCALES
const User = require('../models/user.model');
const { messageStructure } = require('../helpers/object.helpers');
const { messageError } = require('../helpers/messege.helpers');

//_______________________________________________________________________________________________________________
//VALIDACION DE JSON WEB TOKEN
const validateJWT = async( req = request, res, next ) => {

    let response;

    const token = req.header('x-tk');

    //NO CONTIENE TOKEN LA CONSULTA
    if ( !token ) {
        response = messageError(
            401,
            'Token is required for your query...',
            'Se requiere token para su consulta...',
        );
        return res.status(response.status).json({
            response
        })
    }

    try {

        //CONSULTA DE ID DE USUARIO EN TOKEN
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        //BUSQUEDA DE USUARIO POR ID
        const user = await User.findById( uid );

        //EL USUARIO DEL TOKEN NO EXISTE
        if (!user) {
            response = messageError(
                401,
                'Token is wrong...',
                'El token es invalido...',
            );
            return res.status(response.status).json({
                response
            })
        }

        //EL USUARIO DEL TOKEN ESTÁ INACTIVO
        if (!user.state) {
            response = messageError(
                401,
                'Inactive user...',
                'Usuario inactico...',
            );
            return res.status(response.status).json({
                response
            })
        }

        //ASIGNAR DATOS DE USUARIO A LA CONSULTA
        req.uid = uid;
        req.user = user;

        next();

    } catch (error) {
        //ERROR DE VALIDACIÓN DE TOKEN
        response = messageError(
            401,
            'Token invalid...',
            'Token no válido...',
        );
        res.status(response.status).json({
            response
        })
    }
}

//_______________________________________________________________________________________________________________
//EXPORTACION DE MODULOS
module.exports = {
    validateJWT
}