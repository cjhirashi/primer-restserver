//===============================================================================================================
//TITLE: VARIABLES CONTROLLER
//DESCRIPTION: CONTROLADOR DE GESTOR DE DATOS DE ROL DE USUARIOS
//AUTH: Carlos Jimenez @cjhirashi
//===============================================================================================================

//LIBRERIAS GLOBALES
const { response, request  } = require('express');
const bcryptjs = require('bcryptjs');

//LIBRERIAS LOCALES
const { User } = require('../models');
const {
    objectFrom,
    objectLimit,
} = require('../helpers/object.helpers');
const { 
    msgObjects, 
    msgObject, 
    msgObjectUpdate, 
    msgObjectCreate,
    msgObjectDeleted,
    msgErrorServidor
} = require('../helpers/messege.helpers');

//_______________________________________________________________________________________________________________
//ENLISTAR LOS REGISTROS
const listUsers = async (req = request, res = response) => {
    let response;

    //CONSULTA DE PARAMETROS
    const { limit = 5, from = 1} = req.query;

    //ADECUACION DE PARAMETROS
    const fromQuery = objectFrom(from);
    const limitQuery = objectLimit(limit);

    try {
        //TOTAL DE REGISTROS ENCONTRADOS
        const total = await User.countDocuments({state: true});
    
        //LISTA DE REGISTROS
        const users = await User.find({state:true})
            .skip(Number(fromQuery))
            .limit(Number(limitQuery));
    
        //RESPUESTA DE GESTOR DE REGISTROS
        response = msgObjects(
            users,
            total,
            from,
            limit
            );
    
        return res.status(response.status).json(response);
    } catch (error) {
        response = msgErrorServidor();

        return res.status(response.status).json(response);
    }
}

//LEER REGISTRO POR ID
const userGet = async (req = request, res = response) => {
    console.log('HHHOOOLLLAAA');
    //CONSULTA DE PARAMETROS
    const { id } = req.params;

    //BUSCAR REGISTRO POR ID
    const user = await User.findById(id);

    //Gestor de mensaje de respuesta
    const response = msgObject(user);

    //Respuesta de sistema
    res.status(response.status).json(response);

}

//ACTUALIZAR REGISTRO POR ID
const updateUser = async (req, res = response) => {
    let response;

    //CONSULTA DE PARAMETROS
    const { id } = req.params;
    let { name, password, img } = req.body;

    try {
        //ENCRIPTACION DE PASSWORD
        if ( password ) {
            const salt = bcryptjs.genSaltSync();
            password = bcryptjs.hashSync( password, salt );
        }
    
        //ACTUALIZACION DE USUARIO
        await User.findByIdAndUpdate( id, {name, password, img} );
        const user = await User.findById( id );
    
        //RESPUESTA DE CONSULTA
        response = msgObjectUpdate(user);
    
        return res.status(response.status).json(response);
    } catch (error) {
        //ERROR DE SERVIDOR
        response = msgErrorServidor;

        return res.status(response.status).json(response);
    }
}

//CREAR REGISTRO POR ID
const createUser = async(req, res = response) => {

    //CONSULTA DE PARAMETROS
    const { name, email, password } = req.body;

    //CREACION DE USUARIO
    const user = new User({ name, email });
    
    //ENCRIPTACION DE PASSWORD
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );
    
    //CARGAR USUARIO A BASE DE DATOS
    await user.save();

    //RESPUESTA DE CREACION DE USUARIO
    const response = msgObjectCreate( user );

    res.status(response.status).json(response);
}

//DESACTIVAR REGISTRO POR ID
const inactiveUser = async (req, res = response) => {

    //CONSULTA DE PARAMETROS
    const { id } = req.params;

    //DESACTIVAR REGISTRO
    const user = await User.findByIdAndUpdate( id, { state: false });

    const response = msgObjectDeleted( user );

    res.status(response.status).json(response);
}

//ELIMINAR REGISTRO POR ID
const deleteUser = async (req, res = response) => {

    //CONSULTA DE PARAMETROS
    const { id } = req.params;

    //DESACTIVAR REGISTRO
    const user = await User.findByIdAndDelete( id );

    const response = msgObjectDeleted( user );

    res.status(response.status).json(response);
}

module.exports = {
    listUsers,
    userGet,
    updateUser,
    createUser,
    inactiveUser,
    deleteUser
};