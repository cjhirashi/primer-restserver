const validateJWT = require('../middlewares/validate-jwt');
const validateRoles = require('../middlewares/validate-roles');
const validarCampo = require('../middlewares/validar-campo');

module.exports = {
    ...validateJWT,
    ...validateRoles,
    ...validarCampo
}