const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    rele: {
        type: String,
        required: [true, 'El rol es obrigatorio']
    }
});

module.exports = model( 'role', RoleSchema );