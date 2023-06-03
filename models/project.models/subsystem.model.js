//===============================================================================================================
//TITLE: SUBSYSTEM MODEL
//DESCRIPTION: CONTROLADOR DE GESTOR DE DATOS DE ROL DE USUARIOS
//AUTH: Carlos Jimenez @cjhirashi
//      Marcelo Piña @mpina
//===============================================================================================================

//LIBRERIAS GLOBALES
const { Schema, model } = require('mongoose');

//LIBRERIAS LOCALES
const { NoteSchema } = require('../global/note.model');
const { ElementSchema } = require('./element.model');


//_______________________________________________________________________________________________________________
//ESQUEMA DE REGISTRO
const SubsystemSchema = Schema({
    name: {
        type: String,
        uppercase: true,
        required: true
    },
    description: {
        type: String,
    },
    elements: [ElementSchema],
    notes: [NoteSchema],
    img: {
        type: String
    },
    user: {
        type: String
    },
    state: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true
});

//_______________________________________________________________________________________________________________
//TRANSFORMACION DE RESPUESTA DE REGISTRO
SubsystemSchema.methods.toJSON = function() {
    const { __v, _id, ...subsystem } = this.toObject();
    subsystem.uid = _id;
    return subsystem;
}

const Subsystem = model( 'Subsystem', SubsystemSchema );

//_______________________________________________________________________________________________________________
//EXPORTACION DE MODULOS DE CONTROL
module.exports = {
    Subsystem,
    SubsystemSchema
};