//===============================================================================================================
//TITLE: PROJECT MODEL
//DESCRIPTION: CONTROLADOR DE GESTOR DE DATOS DE ROL DE USUARIOS
//AUTH: Carlos Jimenez @cjhirashi
//      Marcelo Piña @mpina
//===============================================================================================================

//LIBRERIAS GLOBALES
const { Schema, model } = require('mongoose');

//LIBRERIAS LOCALES
const { NoteSchema } = require('../global/note.model');
const { SystemSchema } = require('./system.model');

//_______________________________________________________________________________________________________________
//ESQUEMA DE REGISTRO
const ProjectSchema = Schema({
    idProject: {
        type: String,
        uppercase: true,
        require: true
    },
    name: {
        type: String,
        uppercase: true,
        required: true
    },
    description: {
        type: String,
    },
    address: {
    },
    subsystems: [SystemSchema],
    notes: [NoteSchema],
    logo: {
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
ProjectSchema.methods.toJSON = function() {
    const { __v, _id, ...project } = this.toObject();
    project.uid = _id;
    return project;
}

const Project = model( 'Project', ProjectSchema );

//_______________________________________________________________________________________________________________
//EXPORTACION DE MODULOS DE CONTROL
module.exports = {
    Project,
    ProjectSchema
};