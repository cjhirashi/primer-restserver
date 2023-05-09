//========================================================
//TITLE: USER CONTROLLER
//DESCRIPTION: CONTROLADOR DE REGISTRO USUARIOS
//AUTH: Carlos Jimenez @cjhirashi
//========================================================

//LIBRERIAS GLOBALES
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

//LIBRERIAS LOCALES
const { Variable } =  require('../models');


//OBTENER LISTA DE VARIABLES
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
const variablePost = async(req, res = response) => {
    const { name, description, variableType, dataType, note } = req.body;
    console.log('Hola');
    const notes = [];

    if (note) {
        
        notes.push({ note });
    
    }
    const state = true;

    const variable = new Variable({ name, description, variableType, dataType, state, notes });

    await variable.save();


    res.status(200).json({
        response: 'respuesta bien',
        
    });
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
    variablePost,
    variableDelete,
    variableInactive,
    variableNota
};