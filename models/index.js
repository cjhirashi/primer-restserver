

//IMPORTACIONES: CARPETA GLOBALES
const User = require('./global/user.model');
const Role = require('./global/role.model');

//IMPORTACIONES: CARPETA PROYECTOS
const { Variable } = require('./project.models/variable.model');
const { Element } = require('./project.models/element.model');


module.exports = {
    User,
    Role,
    Variable,
    Element
}