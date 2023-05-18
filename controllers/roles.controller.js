//===============================================================================================================
//TITLE: ROLE CONTROLLER
//DESCRIPTION: CONTROLADOR DE GESTOR DE DATOS DE ROL DE USUARIOS
//AUTH: Carlos Jimenez @cjhirashi
//===============================================================================================================

//LIBRERIAS GLOBALES
const { response } = require('express');

//LIBRERIAS LOCALES
const { Role } = require('../models/index');
const { messageError, messageObject, messageToken, messageObjects, messageSuccess, msgObjects } = require('../helpers/messege.helpers');
const {
    objectFrom,
    objectLimit
} = require('../helpers/object.helpers');


//_______________________________________________________________________________________________________________
//ENLISTAR LOS REGISTROS
const listRoles = async( req, res = response ) => {
    let response;

    //CONSULTA DE PARAMETROS
    const { limit = 15, from = 1 } = req.query;
    const userActiv = req.user;

    //ADECUACION DE PARAMETROS
    const fromQuery = objectFrom(from);
    const limitQuery = objectLimit(limit);

    //TOTAL DE REGISTROS ENCONTRADOS
    const total = await Role.countDocuments({state: true});

    //LISTA DE REGISTROS
    const roles = await Role.find({state: true})
        .skip(Number(fromQuery))
        .limit(Number(limitQuery));;

    //RESPUESTA
    response = msgObjects( 
        roles,
        total,
        from,
        limit
    );

     res.status(response.status).json(response);

}

//CREAR NUEBO REGISTRO
const createRole = async(req, res = response) => {
    let response;

    //CONSULTA DE PARAMETROS
    const { role, description } = req.body;

    //VALIDACION SI ROL YA EXISTE
    const roleExist = await Role.findOne({role});

    if ( roleExist ) {
        //MENSAJE DE QUE ROL EXISTE
        response = messageError(
            400,
            'Role already exist...',
            'El rol ya existe...'
        );
    }else{
        //CREACION DE ROL DE USUARIO
        const newRole = new Role( { role, description, state: true } );
        await newRole.save();

        response = messageSuccess(
            201,
            'Role has been created...',
            'El rol se ha creado...'
        );
    }

    res.status(response.status).json(response);

}

//INACTIVAR REGISTRO POR ID
const inactiveRole = async(req, res = response) => {
    let response;

    //CONSULTA DE PARAMETROS
    const { id } = req.params;

    await Role.findByIdAndUpdate( id, { state: false });
    const role = await Role.findById( id );

    if ( !role ) {
        response = messageSuccess(
            400,
            'Role not exist...',
            'El rol no existe...'
        );
    }else{
        response = messageSuccess(
            200,
            'Role eliminated...',
            'Registro eliminado...'
        );
    }

  
    res.status(response.status).json(response);

}

//ELIMINAR REGISTRO POR ID
const deleteRole = async(req, res = response) => {
    let response;

    //CONSULTA DE PARAMETROS
    const { id } = req.params;

    const roleExist = await Role.findById(id);

    if ( !roleExist ) {
        response = messageSuccess(
            400,
            'Role not exist...',
            'El rol no existe...'
        );
    }else{
        await Role.findByIdAndDelete( id );
    
        response = messageSuccess(
            200,
            'Role eliminated...',
            'Registro eliminado...'
        );
    }

    res.status(response.status).json(response);

}

//_______________________________________________________________________________________________________________
//EXPORTACION DE MODULOS DE CONTROL
module.exports = {
    listRoles,
    createRole,
    inactiveRole,
    deleteRole
}