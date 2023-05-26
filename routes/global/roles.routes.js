//===============================================================================================================
//TITLE: ROLES ROUTER
//DESCRIPTION: RUTAS DE CONTROLES DE ACCESO PARA ROLES DE USUARIOS
//AUTH: Carlos Jimenez @cjhirashi
//===============================================================================================================

//LIBRERIAS GLOBALES
const { Router } = require('express');

//LIBRERIAS LOCALES
const { 
    listRoles, 
    createRole, 
    updateRole, 
    inactiveRole, 
    deleteRole 
} = require('../../controllers/global/roles.controller');
const { validateJWT } = require('../../middlewares');

//_______________________________________________________________________________________________________________
//ROUTER
const router = Router();

//_______________________________________________________________________________________________________________
//CONSULTAS WEB
//CONSULTA DE REGISTROS
router.get('/', [
    validateJWT
], listRoles);

//CREACION DE REGISTRO
router.post('/', [
    validateJWT
], createRole);

//ACTUALIZACION DE REGISTRO
router.put('/:id',[
    validateJWT
], updateRole);

//DESACTIVACION DE REGISTRO
router.delete('/:id', [
    validateJWT
], inactiveRole);

//ELIMINACION DE REGISTRO
router.delete('/:id/delete', [
    validateJWT
], deleteRole);

//_______________________________________________________________________________________________________________
//EXPORTACION DE MODULOS DE CONTROL
module.exports = router;