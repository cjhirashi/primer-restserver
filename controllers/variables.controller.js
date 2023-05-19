//===============================================================================================================
//TITLE: VARIABLES CONTROLLER
//DESCRIPTION: CONTROLADOR DE GESTOR DE DATOS DE ROL DE USUARIOS
//AUTH: Carlos Jimenez @cjhirashi
//===============================================================================================================

//LIBRERIAS GLOBALES
const { response, request } = require('express');

//LIBRERIAS LOCALES

const { msgObjectCreate, messageError, msgObjectExist } = require('../helpers/messege.helpers');
const { findOne } = require('../models/variable.model');
const { Variable } = require('../models');


//_______________________________________________________________________________________________________________
//ENLISTAR LOS REGISTROS
const variablesGet = async (req = request, res = response) => {
    const variables = await Variable.find({state: true})
        .skip(Number(0))
        .limit(Number(10));

        res.status(200).json({
            response: 'respuesta bien',
            variables
            
        });

}

//OBTENER VARIABLE
const variableGet = async (req = request, res = response) => {

}

//ACTUALIZAR VARIABLE
const variablePut = async (req, res = response) => {

}

//CREAR VARIABLE
const createVariable = async(req, res = response) => {
    let response;

    //CONSULTA DE PARAMETROS
    const { name, description, variableType, dataType, signal, range, units, multistate, note } = req.body;
    const user = req.user;

    const notes = [];

    if (note) {
            
        notes.push({ note, user: user.email});

    }

    const variableExist = await Variable.findOne({name});

    if (variableExist) {
        response = msgObjectExist();
        return res.status(response.status).json(response);
    }

    const variable = new Variable({ name, description, variableType, dataType, signal, units, range:{max: range.max, min: range.min}, multistate, user: user.email , notes });
    //variable.range.set('max', range.max);
    //variable.range.set('min', range.min);

    await variable.save();

    response = msgObjectCreate( variable );

    res.status(response.status).json(response);
}

//AGREGAR NOTA POR ID
const variableNota = async (req, res = response) => {
    const { id } = req.params;

    const { note, item } = req.body;
    
    const variable = await Variable.findById(id);

    if (item) {
        variable.notes.splice(item,1);
    }
    
    if (note) {
        variable.notes.push({note});
    }

    await variable.save();

    res.json({response: 'agregar nota por id'})
}

//ELIMINAR VARIABLE
const variableDelete = async (req, res = response) => {

}

//DESACTIVAR VARIABLE
const variableInactive = async (req, res = response) => {

}

module.exports = {
    variablesGet,
    variableGet,
    variablePut,
    createVariable,
    variableDelete,
    variableInactive,
    variableNota
};