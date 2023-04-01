const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validateJWT,
    hasRole
} = require('../middlewares');

const Role = require('../models/role.model');

const {
    isValidRole,
    existEmail,
    existUserById
} = require('../helpers/db-validators');

const {
    usersGet,
    userGet,
    usersPut,
    usersPost,
    usersPatch,
    usersDelete
} = require('../controllers/users.controller');

const router = Router();

//Consulta de datos
//____Todos los registros
router.get('/', usersGet );
router.get('/:id',[
    check('id', 'No es un Id válido'),
    validarCampos
],userGet);


router.put('/:id', [
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom( existUserById ),
    check('role').custom( isValidRole ),
    validarCampos
], usersPut);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe contener almenos 6 caracteres').isLength({ min: 6 }),
    //check('email_address', 'El correo es invalido').isEmail(),
    check('email').custom( existEmail ),
    //check('role', 'No es un rol valido').isIn(['SUPER_USER', 'ADMIN_ROLE', 'USER_ROLE', 'VIWER_ROLE']),
    check('role').custom( isValidRole ),  // check('role').custom( (role) => isValidRole(role) ),
    validarCampos
], usersPost);

router.patch('/', usersPatch);

router.delete('/:id', [
    validateJWT,
    //isAdminRole,
    hasRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom( existUserById ),
    validarCampos
], usersDelete);


module.exports = router;