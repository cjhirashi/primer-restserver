//===============================================================================================================
//TITLE: VARIABLES CONTROLLER
//DESCRIPTION: CONTROLADOR DE GESTOR DE DATOS DE ROL DE USUARIOS
//AUTH: Carlos Jimenez @cjhirashi
//===============================================================================================================

//LIBRERIAS GLOBALES
const { response, request } = require('express');

//LIBRERIAS LOCALES
const { Variable } = require('../models');
const { objectFrom, objectLimit } = require('../helpers/object.helpers');
const { msgObjectCreate, msgObjectExist, msgErrorServidor, msgObjects, msgObjectUpdate, msgObjectNotFound, msgAddObject } = require('../helpers/messege.helpers');

//_______________________________________________________________________________________________________________
//ENLISTAR LOS REGISTROS
const listVariables = async (req = request, res = response) => {
    let response;

    //CONSULTA DE PARAMETROS
    const { limit = 10, from = 1} = req.query;

    //ADECUACION DE PARAMETROS
    const fromQuery = objectFrom(from);
    const limitQuery = objectLimit(limit);

    try {
        //TOTAL DE REGISTROS ENCONTRADOS
        const total = await Variable.countDocuments({state: true});
        
        //LISTA DE REGISTROS
        const variables = await Variable.find({state: true})
            .skip(Number(fromQuery))
            .limit(Number(limitQuery));
    
        //RESPUESTA DE GESTOR DE REGISTROS
        response = msgObjects(
            variables,
            total,
            from,
            limit
            );
    
        return res.status(response.status).json(response);

    } catch (error) {
        //ERROR DE SERVIDOR
        response = msgErrorServidor();

        return res.status(response.status).json(response);
    }

}

//CREAR NUEVO REGISTRO
const createVariable = async(req, res = response) => {
    let response;

    //CONSULTA DE PARAMETROS
    const { name, description, variableType, dataType, signal, range, units, multistate } = req.body;
    const user = req.user;

    try {

        //VERIFICACION SI VARIABLE EXISTE
        const variableExist = await Variable.findOne({name});
    
        if (variableExist) {
            response = msgObjectExist();
            return res.status(response.status).json(response);
        }
    
        //CREACION DE VARIABLE NUEVA
        const variable = new Variable({ name, description, variableType, dataType, signal, units, range, multistate, user: user.email });
    
        //CARGA DE VARIABLE A BASE DE DATOS
        await variable.save();
    
        //MENSAJE DE VALIDACION
        response = msgObjectCreate( variable );
    
        return res.status(response.status).json(response);

    } catch (error) {
        //ERROR DE SERVIDOR
        response = msgErrorServidor();

        return res.status(response.status).json(response);
    }

}

//OBTENER VARIABLE
const updateVariable = async (req = request, res = response) => {
    let response;

    //CONSULTA DE PARAMETROS
    const user = req.user;
    const { id } = req.params;
    let { description, variableType, dataType, signal, range, units, multistate } = req.body;

    try {
        //ACTUALIZACION DE REGISTROS
        await Variable.findByIdAndUpdate( id, { description, variableType, dataType, signal, range, units, multistate } );
        const variable = await Variable.findById( id );
    
        //RESPUESTA DE VALIDACION
        response = msgObjectUpdate(variable);
    
        return res.status(response.status).json(response);
    } catch (error) {
        //ERROR DE SERVIDOR
        response = msgErrorServidor();

        return res.status(response.status).json(response);
    }
}

//ACTUALIZAR NOTA
const createNoteVariable = async (req = request, res = response) => {
    let response;

    //CONSULTA DE PARAMETROS
    const user = req.user;
    const { idp } = req.params;
    let { note } = req.body;

    try {
        //OBTENER REGISTRO POR ID
        const variable = await Variable.findById( idp );

        //CONFIRMACION EXISTENCIA DE REGISTRO
        if ( !variable ) {
            response = msgObjectNotFound('variable','variable');

            return res.status(response.status).json(response);
        }

        //AGREGAR NOTA A REGISTRO
        variable.notes.push({note, user: user.email});
        
        //GUARDAR REGISTRO EN BD
        variable.save();

        //MENSAJE DE RESPUESTA
        response = msgAddObject('Note', 'Nota');

        return res.status(response.status).json(response);
    } catch (error) {
        //ERROR DE SERVIDOR
        response = msgErrorServidor();

        return res.status(response.status).json(response);
    }
}

//ACTUALIZAR NOTA
const updateNoteVariable = async (req = request, res = response) => {
    let response;

    //CONSULTA DE PARAMETROS
    const user = req.user;
    const { idp, idc } = req.params;
    let { note } = req.body;

    try {
        //VALIDACION DE EXISTENCIA DE REGISTRO
        const variableExist = await Variable.findById( idp );
        console.log(variableExist.notes.id(idc));
        console.log('Paso 2');
        //const noteExist = variableExist.note.id(idn);
        
        console.log('Paso 3');
        console.log(noteExist);
        
        console.log('Paso 4');
        return res.status(200).json(variableExist);
    } catch (error) {
        //ERROR DE SERVIDOR
        response = msgErrorServidor();

        return res.status(response.status).json(response);
    }
}

//DESACTIVAR VARIABLE
const inactiveVariable = async (req, res = response) => {

}

//DESACTIVAR VARIABLE
const deleteVariable = async (req, res = response) => {

}

//_______________________________________________________________________________________________________________
//EXPORTACION DE MODULOS DE CONTROL
module.exports = {
    listVariables,
    createVariable,
    updateVariable,
    createNoteVariable,
    updateNoteVariable,
    inactiveVariable,
    deleteVariable
};