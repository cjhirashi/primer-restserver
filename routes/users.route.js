const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campo');

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
    check('email_address', 'El correo es invalido').isEmail(),
    check('role', 'No es un rol valido').isIn(['SUPER_USER', 'ADMIN_ROLE', 'USER_ROLE', 'VIWER_ROLE']),
    validarCampos
], usersPost);

router.patch('/', usersPatch);

router.delete('/', usersDelete);


module.exports = router;