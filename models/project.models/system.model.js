//===============================================================================================================
//TITLE: SYSTEM MODEL
//DESCRIPTION: CONTROLADOR DE GESTOR DE DATOS DE ROL DE USUARIOS
//AUTH: Carlos Jimenez @cjhirashi
//      Marcelo Piña @mpina
//===============================================================================================================

//LIBRERIAS GLOBALES
const { Schema, model } = require('mongoose');

//LIBRERIAS LOCALES
const { NoteSchema } = require('../global/note.model');
const { SubsystemSchema } = require('./subsystem.model');


//_______________________________________________________________________________________________________________
//ESQUEMA DE REGISTRO
const SystemSchema = Schema({
    name: {
        type: String,
        uppercase: true,
        required: true
    },
    description: {
        type: String,
    },
    subsystems: [SubsystemSchema],
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
SystemSchema.methods.toJSON = function() {
    const { __v, _id, ...system } = this.toObject();
    system.uid = _id;
    return system;
}

const System = model( 'System', SystemSchema );

//_______________________________________________________________________________________________________________
//EXPORTACION DE MODULOS DE CONTROL
module.exports = {
    System,
    SystemSchema
};