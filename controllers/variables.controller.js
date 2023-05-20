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
const { msgObjectCreate, msgObjectExist, msgErrorServidor, msgObjects, msgObjectUpdate } = require('../helpers/messege.helpers');

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
    const { name, description, variableType, dataType, signal, range, units, multistate, note } = req.body;
    const user = req.user;

    //AGREGAR NOTA A LISTA DE NOTAS
    const notes = [];

    if (note) {
            
        notes.push({ note, user: user.email});

    }

    try {

        //VERIFICACION SI VARIABLE EXISTE
        const variableExist = await Variable.findOne({name});
    
        if (variableExist) {
            response = msgObjectExist();
            return res.status(response.status).json(response);
        }
    
        //CREACION DE VARIABLE NUEVA
        const variable = new Variable({ name, description, variableType, dataType, signal, units, range, multistate, user: user.email , notes });
    
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
    let notes = [];

    //CONSULTA DE PARAMETROS
    const user = req.user;
    const { id } = req.params;
    let { description, variableType, dataType, signal, range, units, multistate, note } = req.body;

    try {
        //VALIDACION DE EXISTENCIA DE REGISTRO
        const variableExist = await Variable.findById( id );
        
        //GESTOR DE LISTA DE NOTAS EXISTENTES EN REGISTRO
        if ( variableExist ) {
            if ( note ) {
                notes = variableExist.notes;
                notes.push({ note, user: user.email});
            }
        }

        //ACTUALIZACION DE REGISTROS
        await Variable.findByIdAndUpdate( id, { description, variableType, dataType, signal, range, units, multistate, notes } );
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
    inactiveVariable,
    deleteVariable
};