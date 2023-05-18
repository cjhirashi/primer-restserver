//===============================================================================================================
//TITLE: ROLES ROUTER
//DESCRIPTION: RUTAS DE CONTROLES DE ACCESO PARA ROLES DE USUARIOS
//AUTH: Carlos Jimenez @cjhirashi
//===============================================================================================================

//LIBRERIAS GLOBALES
const { Router } = require('express');

//LIBRERIAS LOCALES
const { logIn, logOn, googleSignIn } = require('../controllers/auth.controller');
const { 
    isValidName, 
} = require('../middlewares/validate-fiels.middlewares');
const { listRoles, createRole, inactiveRole, deleteRole } = require('../controllers/roles.controller');

//_______________________________________________________________________________________________________________
//ROUTER
const router = Router();

//_______________________________________________________________________________________________________________
//CONSULTAS WEB
//CONSULTA DE REGISTROS
router.get('/', [
    
], listRoles);

//CREACION DE REGISTRO
router.post('/', [

], createRole);

//DESACTIVACION DE REGISTRO
router.delete('/:id', [

], inactiveRole);

//ELIMINACION DE REGISTRO
router.delete('/:id/delete', [

], deleteRole);

//_______________________________________________________________________________________________________________
//EXPORTACION DE MODULOS DE CONTROL
module.exports = router;