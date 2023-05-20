

//IMPORTACIONES: CARPETA GLOBALES
const User = require('./global/user.model');
const Role = require('./global/role.model');

//IMPORTACIONES: CARPETA PROYECTOS
const { Variable } = require('./project.models/variable.model');


module.exports = {
    User,
    Role,
    Variable
}