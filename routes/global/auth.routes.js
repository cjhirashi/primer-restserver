//===============================================================================================================
//TITLE: AUTH ROUTER
//DESCRIPTION: RUTAS DE CONTROLES DE ACCESO PARA AUTENTIFICACION
//AUTH: Carlos Jimenez @cjhirashi
//===============================================================================================================

//LIBRERIAS GLOBALES
const { Router } = require('express');
const { check } = require('express-validator');

//LIBRERIAS LOCALES
const { 
    logIn, 
    logOn, 
    googleSignIn 
} = require('../../controllers/global/auth.controller');
const { 
    isValidName, 
    isValidPassword, 
    isValidEmail, 
    isNotPassword, 
    isNotGoogleToken, 
    isPasswordMatch
} = require('../../middlewares/validate-fiels.middlewares');

//_______________________________________________________________________________________________________________
//ROUTER
const router = Router();

//_______________________________________________________________________________________________________________
//CONSULTAS (POST)
//REGISTRO DE USUARIO POR CORREO
router.post('/logon', [
    isValidName,
    isValidEmail,
    isValidPassword,
    isPasswordMatch
], logOn);

//INICIO DE SESION POR CORREO
router.post('/login', [
    isValidEmail,
    isNotPassword
], logIn);

//INICIO DE SESION POR GOOGLE
router.post('/google', [
    isNotGoogleToken
], googleSignIn);

//_______________________________________________________________________________________________________________
//EXPORTACION DE MODULOS DE CONTROL
module.exports = router;