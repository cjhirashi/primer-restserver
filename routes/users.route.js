const { Router } = require('express');
const { check } = require('express-validator');

const {
    validateFields,
    validateJWT,
    hasRole
} = require('../middlewares');

const Role = require('../models/role.model');

const {
    isValidRole,
    existEmail,
    existUserById
} = require('../helpers/custom-validators.helpers');

const {
    usersGet,
    userGet,
    usersPut,
    usersPost,
    usersPatch,
    usersDelete
} = require('../controllers/users.controller');

const router = Router();

//Ruto de consulta de Usuarios
//Ruta lista de Usuarios
router.get('/', usersGet );

//Ruta Usuario por Id
router.get('/:id',[
    check('id', 'No es un Id válido'),
    validateFields
],userGet);

//Ruta actualización de Usuarios
router.put('/:id', [
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom( existUserById ),
    check('role').custom( isValidRole ),
    validateFields
], usersPut);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe contener almenos 6 caracteres').isLength({ min: 6 }),
    //check('email_address', 'El correo es invalido').isEmail(),
    check('email').custom( existEmail ),
    //check('role', 'No es un rol valido').isIn(['SUPER_USER', 'ADMIN_ROLE', 'USER_ROLE', 'VIWER_ROLE']),
    check('role').custom( isValidRole ),  // check('role').custom( (role) => isValidRole(role) ),
    validateFields
], usersPost);

router.patch('/', usersPatch);

router.delete('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom( existUserById ),
    validateFields
], usersDelete);


module.exports = router;