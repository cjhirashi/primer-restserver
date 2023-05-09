//===============================================================================================================
//TITLE: AUTH ROUTER
//DESCRIPTION: RUTAS DE CONTROLES DE ACCESO
//AUTH: Carlos Jimenez @cjhirashi
//===============================================================================================================

//LIBRERIAS GLOBALES
const { Router } = require('express');
const { check } = require('express-validator');

//LIBRERIAS LOCALES
const { logIn, logOn, googleSignIn } = require('../controllers/auth.controller');
const { isValidationPassword, validateFields } = require('../middlewares/validate-fiels.middlewares');
const { existEmail } = require('../helpers/custom-validators.helpers');

//_______________________________________________________________________________________________________________
//ROUTER
const router = Router();

//_______________________________________________________________________________________________________________
//CONSULTAS (POST)
//LOG-IN NORMAL
router.post('/login', [
    check('email', 'El correo es invalido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], logIn);

router.post('/logon', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe contener almenos 6 caracteres').isLength({ min: 6 }),
    check('email', 'El correo es invalido').isEmail(),
    check('email').custom( existEmail ),
    isValidationPassword,
    validateFields
], logOn);

//LOG-IN GOOGLE
router.post('/google', [
    check('id_token', 'id_token es necesario').not().isEmpty(),
    validateFields
], googleSignIn);

//_______________________________________________________________________________________________________________
//EXPORTACION DE MODULOS DE CONTROL
module.exports = router;