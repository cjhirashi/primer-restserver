//===============================================================================================================
//TITLE: VALIDATE FIELS
//DESCRIPTION: VALIDACION DE CAMPOS DE DATOS
//AUTH: Carlos Jimenez @cjhirashi
//===============================================================================================================

//LIBRERIAS GLOBALES
const { validationResult } = require('express-validator');

//LIBRERIAS LOCALES
const { messageStructure } = require('../helpers/object.helpers');
const { validarNombre, validarCorreo, validarPassword } = require('../helpers/expresionesRegulares.helpers');
const User = require('../models/user.model');
const { messageError } = require('../helpers/messege.helpers');

//_______________________________________________________________________________________________________________
//MODELO DE MENSAJE DE RESPUESTA
const messageResponse = (status, english, spanish) => {
    return {
        status,
        error: {
            en: english,
            es: spanish
        }
    };
}

//_______________________________________________________________________________________________________________
//VALIDACION DE NOMBRE
const isValidName = ( req, res, next ) => {

    const { name } = req.body;

    if ( !name ) {
        return res.status(400).json({
            response: messageError(
                400,
                'Name is required...',
                'El nombre es requerido...'
            )
        });
    }

    const valName = validarNombre(name);

    if ( !valName ) {
        return res.status(400).json({
            response: messageError(
                400,
                'Name is wrong...',
                'El nombre es incorrecto...'
            )
        });
    }

    next();

}

//VALIDACION DE EMAIL
const isValidEmail = ( req, res, next ) => {

    const { email } = req.body;

    if ( !email ) {
        return res.status(400).json({
            response: messageError(
                400,
                'Email is required...',
                'El email es requerido...'
            )
        });
    }

    const valEmail = validarCorreo(email);

    if ( !valEmail ) {
        return res.status(400).json({
            response: messageError(
                400,
                'Email is wrong...',
                'El email es incorrecto...'
            )
        });
    }

    next();
}

//VALIDACION DE PASSWORD
const isValidPassword = ( req, res, next ) => {

    const { password } = req.body;

    if ( !password ) {
        return res.status(400).json({
            response: messageError(
                400,
                'Password is required...',
                'El password es requerido...'
            )
        });
    }

    const valPassword = validarPassword( password );

    if ( !valPassword ) {
        return res.status(400).json({
            response: messageError(
                400,
                'Is required (Uppercase, Lowercase, number, especial character) 8 to 16 characters...',
                'Es requerido (Mayúscula, Minúscula, numero, caracter especial) 8 a 16 caracteres...'
            )
        });
    }

    next();

}

//COMPARACION DE PASSWORD
const isPasswordMatch = ( req, res, next ) => {

    const { password, vpassword } = req.body;

    if ( password !== vpassword ) {
        return res.status(400).json({
            response: messageError(
                400,
                'Password not match...',
                'El password no coincide...'
            )
        });
    }

    next();

}

//EL PASSWORD ESTA VACIO
const isNotPassword = ( req, res, next ) => {

    const { password } = req.body;

    if ( !password ) {
        return res.status(400).json({
            response: messageError(
                400,
                'Password is required...',
                'El password es requerido...'
            )
        });
    }

    next();
}

//VALIDACION DE CAMPOS
const validateFields = ( req, res, next ) => {

    const errorsResponse = validationResult(req);

    if ( !errorsResponse.isEmpty() ) {
        const response = messageStructure(
            status = 400,
            msEn = null,
            msEs = null,
            erEn = null,
            erEs = null, 
            total = null,
            from = null,
            limits = null,
            object = null,
            objects = null,
            errors = errorsResponse.errors
        );
        return res.status(response.status).json(response);
    }

    next();

}

//VALIDACION TOKE GOOGLE
const isNotGoogleToken = ( req, res, next ) => {
    const { id_token } = req.body;

    if ( !id_token ) {
        return res.status(400).json({
            response: messageError(
                400,
                'Google token is required...',
                'El token de google es requerido...'
            )
        });
    }

    next();
}

//Módulo de exportación de funciones
module.exports = {
    isValidName,
    isValidEmail,
    isValidPassword,
    isPasswordMatch,
    isNotPassword,
    validateFields,
    isNotGoogleToken
}