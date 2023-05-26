//===============================================================================================================
//TITLE: VARIABLES CONTROLLER
//DESCRIPTION: CONTROLADOR DE GESTOR DE DATOS DE ROL DE USUARIOS
//AUTH: Carlos Jimenez @cjhirashi
//===============================================================================================================

//LIBRERIAS GLOBALES
//const { request, response } = require('express');

//LIBRERIAS LOCALES
const { Variable } = require('../models');
const { objectFrom, objectLimit } = require('../helpers/object.helpers');
const { 
    msgErrorServidor, 
    msgObjects, 
    msgObject, 
    msgObjectCreate, 
    msgObjectExist, 
    msgObjectUpdate, 
    msgObjectNotFound, 
    msgAddObject, 
    msgUpdateObject, 
    msgDeleteObject,
    msgErrServ,
    msgObjectDeleted
} = require('../helpers/messege.helpers');

//_______________________________________________________________________________________________________________
//ENLISTAR LOS REGISTROS
const listVariables = async (req, res) => {
    let response;

    //CONSULTA DE PARAMETROS
    const { limit = 10, from = 1, state = true} = req.query;

    //ADECUACION DE PARAMETROS
    const fromQuery = objectFrom(from);
    const limitQuery = objectLimit(limit);

    try {

        //TOTAL DE REGISTROS ENCONTRADOS
        const total = await Variable.countDocuments({state});
        
        //LISTA DE REGISTROS
        const variables = await Variable.find({state})
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
        response = msgErrServ(error);
        return res.status(response.status).json(response);

    }

}

//CREAR NUEVO REGISTRO
const createVariable = async(req, res) => {
    let response;

    //CONSULTA DE PARAMETROS
    const user = req.user;
    const { name, description, variableType, dataType, signal, range, units, multistate } = req.body;

    try {

        //VERIFICACION SI VARIABLE EXISTE
        const variableExist = await Variable.findOne({name});
    
        if ( variableExist ) {
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
        response = msgErrServ(error);
        return res.status(response.status).json(response);
    }

}

//CREAR NUEVO REGISTRO
const findVariable = async(req, res) => {
    let response;

    //CONSULTA DE PARAMETROS
    const user = req.user;
    const { id } = req.params;

    try {

        //BUSCAR VARIABLE
        const variable = await Variable.findById( id );
    
        //MENSAJE DE VALIDACION
        response = msgObject( variable );
        return res.status(response.status).json(response);

    } catch (error) {

        //ERROR DE SERVIDOR
        response = msgErrServ(error);
        return res.status(response.status).json(response);

    }

}

//OBTENER VARIABLE
const updateVariable = async (req, res) => {
    let response;

    //CONSULTA DE PARAMETROS
    const user = req.user;
    const { id } = req.params;
    let { description, variableType, dataType, signal, range, units, multistate } = req.body;

    try {

        //ACTUALIZACION DE REGISTROS
        await Variable.findByIdAndUpdate( id, { description, variableType, dataType, signal, range, units, multistate, user: user.email } );
        const variable = await Variable.findById( id );
    
        //RESPUESTA DE VALIDACION
        response = msgObjectUpdate(variable);
        return res.status(response.status).json(response);

    } catch (error) {

        //ERROR DE SERVIDOR
        response = msgErrServ(error);
        return res.status(response.status).json(response);

    }
}

//CREAR NOTA
const createNoteVariable = async (req, res) => {
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
        response = msgErrServ(error);
        return res.status(response.status).json(response);

    }
}

//ACTUALIZAR NOTA
const updateNoteVariable = async (req, res) => {
    let response;

    //CONSULTA DE PARAMETROS
    const user = req.user;
    const { idp, idc } = req.params;
    let { note } = req.body;

    try {

        //OBTENER REGISTRO POR ID
        const variable = await Variable.findById( idp );

        //CONFIRMACION EXISTENCIA DE REGISTRO
        if ( !variable ) {
            response = msgObjectNotFound('variable','variable');
            return res.status(response.status).json(response);
        }

        //ACTUALIZAR NOTA
        variable.notes.forEach((element) => {
            if ( element._id == idc ) {
                element.note = note;
                element.user = user.email;
            }
        });

        //GUARDAR REGISTRO EN BD
        variable.save();
        
        //MENSAJE DE RESPUESTA
        response = msgUpdateObject('note','nota');
        return res.status(response.status).json(response);

    } catch (error) {

        //ERROR DE SERVIDOR
        response = msgErrServ(error);
        return res.status(response.status).json(response);

    }
}

//CREAR NOTA
const deleteNoteVariable = async (req, res) => {
    let response;

    //CONSULTA DE PARAMETROS
    const { idp, idc } = req.params;

    try {

        //OBTENER REGISTRO POR ID
        const variable = await Variable.findById( idp );

        //CONFIRMACION EXISTENCIA DE REGISTRO
        if ( !variable ) {
            response = msgObjectNotFound('variable','variable');
            return res.status(response.status).json(response);
        }

        //ELIMINAR NOTA DE REGISTRO
        let index = -1;
        variable.notes.forEach((element, i) => {
            if ( element._id == idc ) {
                index = i;
            }
        });

        if ( index >= 0 ) {
            variable.notes.splice( index, 1 );
        }else{
            response = msgObjectNotFound('note', 'nota');
            return res.status(response.status).json(response);
        }

        //GUARDAR REGISTRO EN BD
        variable.save();

        //MENSAJE DE RESPUESTA
        response = msgDeleteObject('note', 'nota');
        return res.status(response.status).json(response);

    } catch (error) {

        //ERROR DE SERVIDOR
        response = msgErrServ(error);
        return res.status(response.status).json(response);

    }
}

//DESACTIVAR VARIABLE
const inactiveVariable = async (req, res) => {
    let response;

    //CONSULTA DE PARAMETROS
    const { id } = req.params;

    try {

        //DESACTIVACION DE REGISTRO
        const variable = await Variable.findByIdAndUpdate( id, { state: false } );

        //RESPUESTA DE SERVIDOR
        response = msgObjectDeleted( variable );
        return res.status(response.status).json(response);

    } catch (error) {
        
        //ERROR DE SERVIDOR
        response = msgErrServ(error);
        return res.status(response.status).json(response);

    }

}

//DESACTIVAR VARIABLE
const deleteVariable = async (req, res) => {
    let response;

    //CONSULTA DE PARAMETROS
    const { id } = req.params;

    try {
        
        //DESACTIVACION DE REGISTRO
        const variable = await Variable.findByIdAndDelete( id );
 
        //RESPUESTA DE SERVIDOR
        response = msgObjectDeleted( variable );
        return res.status(response.status).json(response);

    } catch (error) {
        
        //ERROR DE SERVIDOR
        response = msgErrServ(error);
        return res.status(response.status).json(response);

    }
}

//_______________________________________________________________________________________________________________
//EXPORTACION DE MODULOS DE CONTROL
module.exports = {
    listVariables,
    createVariable,
    findVariable,
    updateVariable,
    createNoteVariable,
    updateNoteVariable,
    deleteNoteVariable,
    inactiveVariable,
    deleteVariable
};