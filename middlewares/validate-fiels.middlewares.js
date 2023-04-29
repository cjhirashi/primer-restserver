//========================================================
//TITLE: VALIDAR CAMPOS
//DESCRIPTION: CONTROLADOR DE REGISTRO USUARIOS
//AUTH: Carlos Jimenez @cjhirashi
//========================================================

//LIBRERIAS
const { validationResult } = require('express-validator');
const { messageStructure } = require('../helpers/object.helpers');

//Validador de campos en consultas
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

//Módulo de exportación de funciones
module.exports = {
    validateFields
}