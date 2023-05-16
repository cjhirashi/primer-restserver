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

//_______________________________________________________________________________________________________________
//VALIDACION DE JSON WEB TOKEN
const validateJWT = async( req = request, res, next ) => {

    let response;

    const token = req.header('x-tk');

    //NO CONTIENE TOKEN LA CONSULTA
    if ( !token ) {
        response = messageStructure(
            status = 401,
            msEn = 'Token is required for your query...',
            msEs = 'Se requiere token para su consulta...',
        );
        return res.status(response.status).json({
            response
        })
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        const user = await User.findById( uid );

        //EL USUARIO DEL TOKEN NO EXISTE
        if (!user) {
            response = messageStructure(
                status = 401,
                msEn = 'The user dont exist...',
                msEs = 'No existe el usuario...',
            );
            return res.status(response.status).json({
                response
            })
        }

        //EL USUARIO DEL TOKEN ESTÁ INACTIVO
        if (!user.state) {
            response = messageStructure(
                status = 401,
                msEn = 'Inactive user...',
                msEs = 'Usuario inactico...',
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
        response = messageStructure(
            status = 401,
            msEn = 'Token invalid...',
            msEs = 'Token no válido...',
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