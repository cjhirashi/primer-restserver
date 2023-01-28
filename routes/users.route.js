const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/role.model');

const { validarCampos } = require('../middlewares/validar-campo');
const {
    isValidRole,
    existEmail
} = require('../helpers/db-validators');

const {
    usersGet,
    usersPut,
    usersPost,
    usersPatch,
    usersDelete
} = require('../controllers/users.controller');

const router = Router();

router.get('/', usersGet );

router.put('/:id', usersPut);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe contener almenos 6 caracteres').isLength({ min: 6 }),
    //check('email_address', 'El correo es invalido').isEmail(),
    check('email_address').custom( existEmail ),
    //check('role', 'No es un rol valido').isIn(['SUPER_USER', 'ADMIN_ROLE', 'USER_ROLE', 'VIWER_ROLE']),
    check('role').custom( isValidRole ),  // check('role').custom( (role) => isValidRole(role) ),
    validarCampos
], usersPost);

router.patch('/', usersPatch);

router.delete('/', usersDelete);


module.exports = router;