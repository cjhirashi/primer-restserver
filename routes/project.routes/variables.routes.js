//===============================================================================================================
//TITLE: VARIABLES ROUTER
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
    listVariables, 
    createVariable, 
    updateVariable,
    createNoteVariable,
    updateNoteVariable,
    deleteNoteVariable,
    findVariable,
    inactiveVariable,
    deleteVariable
} = require('../../controllers/project.controllers/variables.controller');


//_______________________________________________________________________________________________________________
//SERVIDOR DE RUTAS
const router = Router();

//_______________________________________________________________________________________________________________
//CONSULTAS WEB
//CONSULTA DE REGISTROS
router.get('/', [
    validateJWT
], listVariables);

//CREACION DE REGISTRO
router.post('/', [
    validateJWT
], createVariable);

//CONSULTAR REGISTRO POR ID
router.get('/:id', [
    validateJWT,
    isMongoId
], findVariable);

//ACTUALIZAR REGISTRO POR ID
router.put('/:id', [
    validateJWT,
    isMongoId
], updateVariable);

//CREAR NOTA DE REGISTRO POR ID
router.post('/:idp/note',[
    validateJWT,
], createNoteVariable);

//ACTUALIZAR NOTAS DE REGISTRO POR ID
router.put('/:idp/note/:idc',[
    validateJWT,
], updateNoteVariable);

//ELIMINAR NOTA DE REGISTRO POR ID
router.delete('/:idp/note/:idc',[
    validateJWT,
], deleteNoteVariable);

//DESACTIVAR REGISTRO POR ID
router.delete('/:id', [
    validateJWT,
    isMongoId
], inactiveVariable);

//ELIMINAR REGISTRO POR ID
router.delete('/:id/delete', [
    validateJWT,
    isMongoId
], deleteVariable);

//_______________________________________________________________________________________________________________
//EXPORTACION DE MODULOS DE CONTROL
module.exports = router;