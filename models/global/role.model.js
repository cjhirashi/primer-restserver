//===============================================================================================================
//TITLE: ROLE MODEL
//DESCRIPTION: MODELO DE DATOS DE ROL DE USUAIRO
//AUTH: Carlos Jimenez @cjhirashi
//===============================================================================================================

//LIBRERIAS GLOBALES
const { Schema, model } = require('mongoose');

//_______________________________________________________________________________________________________________
//ESQUEMA DE REGISTO
const RoleSchema = Schema({
    role: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    user: {
        type: String
    },
    state: {
        type: Boolean,
        required: true,
        default: true
    }
},{
    timestamps: true
});

//_______________________________________________________________________________________________________________
//TRANSFORMACION DE RESPUESTA DE REGISTRO
RoleSchema.methods.toJSON = function() {
    const { __v, _id, state, ...role } = this.toObject();
    role.uid = _id;
    return role;
}

//_______________________________________________________________________________________________________________
//EXPORTACION DE MODULOS DE CONTROL
module.exports = model( 'Role', RoleSchema );