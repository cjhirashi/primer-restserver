//===============================================================================================================
//TITLE: USERS ROUTER
//DESCRIPTION: RUTAS DE CONTROLES DE ACCESO PARA USUARIOS
//AUTH: Carlos Jimenez @cjhirashi
//===============================================================================================================

//LIBRERIAS GLOBALES
const { Router } = require('express');
const { check } = require('express-validator');

//LIBRERIAS LOCALES
const {
    validateFields,
    validateJWT,
    hasRole,
    isValidPassword
} = require('../../middlewares');
const { Role } = require('../../models');
const {
    isValidRole,
    existEmail,
    existUserById
} = require('../../helpers/custom-validators.helpers');
const {
    listUsers,
    userGet,
    updateUser,
    createUser,
    inactiveUser,
    deleteUser
} = require('../../controllers/global/users.controller');

//_______________________________________________________________________________________________________________
//ROUTER
const router = Router();

//_______________________________________________________________________________________________________________
//CONSULTAS WEB
//CONSULTA DE REGISTROS
router.get('/', [
    validateJWT,
],listUsers);

//CREACION DE REGISTRO
router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe contener almenos 6 caracteres').isLength({ min: 6 }),
    check('email').custom( existEmail ),
    check('role').custom( isValidRole ),  // check('role').custom( (role) => isValidRole(role) ),
    validateFields
], createUser);

//CONSULTA DE REGISTRO POR ID
router.get('/:id',[
    validateJWT,
    check('id', 'No es un Id válido'),
    validateFields
],userGet);


//ACTUALIZACION DE REGISTRO POR ID
router.put('/:id', [
    validateJWT,
    isValidPassword
], updateUser);

//DESACTIVACION DE REGISTRO
router.delete('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom( existUserById ),
    validateFields
], inactiveUser);

//DESACTIVACION DE REGISTRO
router.delete('/:id/delete', [

], deleteUser);

module.exports = router;