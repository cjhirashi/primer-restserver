//========================================================
//TITLE: AUTH CONTROLLER
//DESCRIPTION: CONTROLADOR DE INICIO DE SESION
//AUTH: Carlos Jimenez @cjhirashi
//========================================================

//LIBRERIAS
const { Router } = require('express');
const { check } = require('express-validator');

const { login,googleSignIn } = require('../controllers/auth.controller');

const { validateFields } = require('../middlewares/validate-fiels.middlewares');


const router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], login);

router.post('/google', [
    check('id_token', 'id_token es necesario').not().isEmpty(),
    validateFields
], googleSignIn);

module.exports = router;