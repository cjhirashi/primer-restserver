//===============================================================================================================
//TITLE: ELEMENTS ROUTER
//DESCRIPTION: RUTAS DE CONTROLES DE ACCESO PARA ROLES DE USUARIOS
//AUTH: Carlos Jimenez @cjhirashi
//===============================================================================================================

//LIBRERIAS GLOBALES
const { Router } = require('express');

//LIBRERIAS LOCALES
const { 
    validateJWT, 
    isMongoId 
} = require('../../middlewares');
const { 
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
    deleteElement
} = require('../../controllers/project.controllers/elements.controller');


//_______________________________________________________________________________________________________________
//SERVIDOR DE RUTAS
const router = Router();

//_______________________________________________________________________________________________________________
//CONSULTAS WEB
//CONSULTA DE REGISTROS
router.get('/', [
    validateJWT
], listElements);

//CREACION DE REGISTRO
router.post('/', [
    validateJWT
], createElement);

//CONSULTAR REGISTRO POR ID
router.get('/:id', [
    validateJWT,
    isMongoId
], findElement);

//ACTUALIZAR REGISTRO POR ID
router.put('/:id', [
    validateJWT,
    isMongoId
], updateElement);

//CREAR VARIABLE DE REGISTRO POR ID
router.post('/:idp/variables',[
    validateJWT,
], createVariableElement);

//ACTUALIZAR VARIABLE DE REGISTRO POR ID
router.put('/:idp/variables/:idc',[
    validateJWT,
], updateVariableElement);

//ELIMINAR VARIABLE DE REGISTRO POR ID
router.delete('/:idp/variables/:idc',[
    validateJWT,
], deleteVariableElement);

//CREAR NOTA DE REGISTRO POR ID
router.post('/:idp/note',[
    validateJWT,
], createNoteElement);

//ACTUALIZAR NOTAS DE REGISTRO POR ID
router.put('/:idp/note/:idc',[
    validateJWT,
], updateNoteElement);

//ELIMINAR NOTA DE REGISTRO POR ID
router.delete('/:idp/note/:idc',[
    validateJWT,
], deleteNoteElement);

//DESACTIVAR REGISTRO POR ID
router.delete('/:id', [
    validateJWT,
    isMongoId
], inactiveElement);

//ELIMINAR REGISTRO POR ID
router.delete('/:id/delete', [
    validateJWT,
    isMongoId
], deleteElement);

//_______________________________________________________________________________________________________________
//EXPORTACION DE MODULOS DE CONTROL
module.exports = router;