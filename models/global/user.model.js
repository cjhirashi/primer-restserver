//===============================================================================================================
//TITLE: USER MODEL
//DESCRIPTION: MODELO DE DATOS DE USUARIOS
//AUTH: Carlos Jimenez @cjhirashi
//===============================================================================================================

//LIBRERIAS GLOBALES
const { Schema, model } = require('mongoose');

//_______________________________________________________________________________________________________________
//ESQUEMA DE REGISTO
const UserSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        default: 'UNDEFINED'
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

//_______________________________________________________________________________________________________________
//TRANSFORMACION DE RESPUESTA DE REGISTRO
UserSchema.methods.toJSON = function() {
    const { __v, password, _id, state, google, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

//_______________________________________________________________________________________________________________
//EXPORTACION DE MODULOS DE CONTROL
module.exports = model( 'User', UserSchema );