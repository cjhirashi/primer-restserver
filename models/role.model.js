const { Schema, model } = require('mongoose');

//Esquema de registro
const RoleSchema = Schema({
    rele: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});

//Exportación de módulos
module.exports = model( 'role', RoleSchema );