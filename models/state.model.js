//===============================================================================================================
//TITLE: USER MODEL
//DESCRIPTION: MODELO DE DATOS DE USUARIOS
//AUTH: Carlos Jimenez @cjhirashi
//===============================================================================================================

//LIBRERIAS GLOBALES
const { Schema, model } = require('mongoose');

//_______________________________________________________________________________________________________________
//ESQUEMA DE REGISTO
const StateSchema = Schema({
    nameState: {
        type: String,
        uppercase: true,
    }
});

//_______________________________________________________________________________________________________________
//TRANSFORMACION DE RESPUESTA DE REGISTRO
StateSchema.methods.toJSON = function() {
    const { __v, _id, ...state } = this.toObject();
    state.uid = _id;
    return state;
}

const State = model( 'State', StateSchema );

//_______________________________________________________________________________________________________________
//EXPORTACION DE MODULOS DE CONTROL
module.exports = {
    State,
    StateSchema
}