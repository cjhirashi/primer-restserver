const validateJWT = require('./validate-jwt.middlewares');
const validateRoles = require('./validate-roles.middlewares');
const validateFields = require('./validate-fiels.middlewares');

module.exports = {
    ...validateJWT,
    ...validateRoles,
    ...validateFields
}