//===============================================================================================================
//TITLE: VARIABLES CONTROLLER
//DESCRIPTION: CONTROLADOR DE GESTOR DE DATOS DE ROL DE USUARIOS
//AUTH: Carlos Jimenez @cjhirashi
//===============================================================================================================

//LIBRERIAS GLOBALES
//const { request, response } = require('express');

//LIBRERIAS LOCALES
const { Element } = require('../../models');
const { objectFrom, objectLimit } = require('../../helpers/object.helpers');
const { 
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
} = require('../../helpers/messege.helpers');

//_______________________________________________________________________________________________________________
//ENLISTAR LOS REGISTROS
const listElements = async (req, res) => {
    let response;

    //CONSULTA DE PARAMETROS
    const { limit = 10, from = 1, state = true} = req.query;

    //ADECUACION DE PARAMETROS
    const fromQuery = objectFrom(from);
    const limitQuery = objectLimit(limit);

    try {
        
        //TOTAL DE REGISTROS ENCONTRADOS
        const total = await Element.countDocuments({state});
        
        //LISTA DE REGISTROS
        const element = await Element.find({state})
            .skip(Number(fromQuery))
            .limit(Number(limitQuery));
    
        //RESPUESTA DE GESTOR DE REGISTROS
        response = msgObjects(
            element,
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
const createElement = async(req, res) => {
    let response;

    //CONSULTA DE PARAMETROS
    const user = req.user;
    const { name, description, img } = req.body;

    try {

        //VERIFICACION SI REGISTRO EXISTE
        const elementExist = await Element.findOne({name});
    
        if ( elementExist ) {
            response = msgObjectExist();
            return res.status(response.status).json(response);
        }

        //CREACION DE REGISTRO NUEVO
        const element = new Element({ name, description, img, user: user.email });
    
        //CARGA DE REGISTRO A BASE DE DATOS
        await element.save();

        //MENSAJE DE VALIDACION
        response = msgObjectCreate( element );
        return res.status(response.status).json(response);
        
    } catch (error) {
        
        //ERROR DE SERVIDOR
        response = msgErrServ(error);
        return res.status(response.status).json(response);
        
    }

}

//CREAR NUEVO REGISTRO
const findElement = async(req, res) => {
    let response;

    //CONSULTA DE PARAMETROS
    const { id } = req.params;

    try {
        
        //BUSCAR VARIABLE
        const element = await Element.findById( id );
    
        //MENSAJE DE VALIDACION
        response = msgObject( element );
        return res.status(response.status).json(response);

    } catch (error) {
        
        //ERROR DE SERVIDOR
        response = msgErrServ(error);
        return res.status(response.status).json(response);

    }
}

//OBTENER VARIABLE
const updateElement = async (req, res) => {
    let response;

    //CONSULTA DE PARAMETROS
    const user = req.user;
    const { id } = req.params;
    let { name, description, img } = req.body;

    try {

        //ACTUALIZACION DE REGISTROS
        await Element.findByIdAndUpdate( id, { name, description, img, user: user.email } );
        const element = await Element.findById( id );
    
        //RESPUESTA DE VALIDACION
        response = msgObjectUpdate(element);
        return res.status(response.status).json(response);

    } catch (error) {

        //ERROR DE SERVIDOR
        response = msgErrServ(error);
        return res.status(response.status).json(response);

    }
}

//CREAR VARIABLE
const createVariableElement = async (req, res) => {
    let response;

    //CONSULTA DE PARAMETROS
    const user = req.user;
    const { idp } = req.params;
    let { name, description, variableType, dataType, signal, range, units, multistate } = req.body;
    console.log(name.toUpperCase());
    try {

        console.log('Paso 1');
        //OBTENER REGISTRO POR ID
        const element = await Element.findById( idp );
        
        console.log('Paso 2');
        //CONFIRMACION EXISTENCIA DE REGISTRO
        if ( !element ) {
            response = msgObjectNotFound('element','elemento');
            return res.status(response.status).json(response);
        }
        
        console.log('Paso 3');
        //VERIFICACION SI REGISTRO EXISTE
        const variables = element.variables;

        console.log('Paso 4');
        //console.log(variables);
        //let variableExist = variables.indexOf({name});
        let variableExist = false;
        variables.forEach((element) => {
            console.log(element.name);
            if (element.name == name.toUpperCase()) {
                variableExist = true;
            }
        })
        console.log('Paso 5');
        console.log(variableExist);

        console.log('Paso 6');
        if ( variableExist ) {
            response = msgObjectExist();
            return res.status(response.status).json(response);
        }

        console.log('Paso 7');
        //AGREGAR NOTA A REGISTRO
        element.variables.push({name, description, variableType, dataType, signal, range, units, multistate, user: user.email});
        
        console.log('Paso 7');
        //GUARDAR REGISTRO EN BD
        element.save();

        console.log('Paso 8');
        //MENSAJE DE RESPUESTA
        response = msgAddObject('variable', 'variable');
        return res.status(response.status).json(response);

    } catch (error) {

        //ERROR DE SERVIDOR
        response = msgErrServ(error);
        return res.status(response.status).json(response);

    }
}

//ACTUALIZAR VARIABLE
const updateVariableElement = async (req, res) => {
    
}

//CREAR VARIABLE
const deleteVariableElement = async (req, res) => {
    
}

//CREAR NOTA
const createNoteElement = async (req, res) => {
    let response;

    //CONSULTA DE PARAMETROS
    const user = req.user;
    const { idp } = req.params;
    let { note } = req.body;

    try {

        //OBTENER REGISTRO POR ID
        const element = await Element.findById( idp );

        //CONFIRMACION EXISTENCIA DE REGISTRO
        if ( !element ) {
            response = msgObjectNotFound('element','elemento');
            return res.status(response.status).json(response);
        }

        //AGREGAR NOTA A REGISTRO
        element.notes.push({note, user: user.email});
        
        //GUARDAR REGISTRO EN BD
        element.save();

        //MENSAJE DE RESPUESTA
        response = msgAddObject('note', 'nota');
        return res.status(response.status).json(response);

    } catch (error) {

        //ERROR DE SERVIDOR
        response = msgErrServ(error);
        return res.status(response.status).json(response);

    }
}

//ACTUALIZAR NOTA
const updateNoteElement = async (req, res) => {
    let response;

    //CONSULTA DE PARAMETROS
    const user = req.user;
    const { idp, idc } = req.params;
    let { note } = req.body;

    try {

        //OBTENER REGISTRO POR ID
        const element = await Element.findById( idp );

        //CONFIRMACION EXISTENCIA DE REGISTRO
        if ( !element ) {
            response = msgObjectNotFound('element','elemento');
            return res.status(response.status).json(response);
        }

        //ACTUALIZAR NOTA
        element.notes.forEach((element) => {
            if ( element._id == idc ) {
                element.note = note;
                element.user = user.email;
            }
        });

        //GUARDAR REGISTRO EN BD
        element.save();
        
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
const deleteNoteElement = async (req, res) => {
    let response;

    //CONSULTA DE PARAMETROS
    const { idp, idc } = req.params;

    try {

        //OBTENER REGISTRO POR ID
        const element = await Element.findById( idp );

        //CONFIRMACION EXISTENCIA DE REGISTRO
        if ( !element ) {
            response = msgObjectNotFound('element','elemento');
            return res.status(response.status).json(response);
        }

        //ELIMINAR NOTA DE REGISTRO
        let index = -1;
        element.notes.forEach((element, i) => {
            if ( element._id == idc ) {
                index = i;
            }
        });

        if ( index >= 0 ) {
            element.notes.splice( index, 1 );
        }else{
            response = msgObjectNotFound('note', 'nota');
            return res.status(response.status).json(response);
        }

        //GUARDAR REGISTRO EN BD
        element.save();

        //MENSAJE DE RESPUESTA
        response = msgDeleteObject('note', 'nota');
        return res.status(response.status).json(response);

    } catch (error) {

        //ERROR DE SERVIDOR
        response = msgErrServ(error);
        return res.status(response.status).json(response);

    }
}

//DESACTIVAR REGISTRO
const inactiveElement = async (req, res) => {
    let response;

    //CONSULTA DE PARAMETROS
    const { id } = req.params;

    try {

        //DESACTIVACION DE REGISTRO
        const element = await Element.findByIdAndUpdate( id, { state: false } );

        //RESPUESTA DE SERVIDOR
        response = msgObjectDeleted( element );
        return res.status(response.status).json(response);

    } catch (error) {
        
        //ERROR DE SERVIDOR
        response = msgErrServ(error);
        return res.status(response.status).json(response);

    }
}

//ELIMINAR REGISTRO
const deleteElement = async (req, res) => {
    let response;

    //CONSULTA DE PARAMETROS
    const { id } = req.params;

    try {
        
        //DESACTIVACION DE REGISTRO
        const element = await Element.findByIdAndDelete( id );
 
        //RESPUESTA DE SERVIDOR
        response = msgObjectDeleted( element );
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
    listElements,
    createElement,
    findElement,
    updateElement,
    createVariableElement,
    updateVariableElement,
    deleteVariableElement,
    createNoteElement,
    updateNoteElement,
    deleteNoteElement,
    inactiveElement,
    deleteElement,
};