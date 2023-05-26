//===============================================================================================================
//TITLE: VARIABLES MODEL
//DESCRIPTION: CONTROLADOR DE GESTOR DE DATOS DE ROL DE USUARIOS
//AUTH: Carlos Jimenez @cjhirashi
//      Marcelo Piña @mpina
//===============================================================================================================

//LIBRERIAS GLOBALES
const { Schema, model } = require('mongoose');

//LIBRERIAS LOCALES
const { NoteSchema } = require('../global/note.model');

//_______________________________________________________________________________________________________________
//ESQUEMA DE REGISTRO
const VariableSchema = Schema({
    name: {
        type: String,
        uppercase: true,
        required: true
    },
    description: {
        type: String,
    },
    variableType: {
        type: String,
        default: '---',
        uppercase: true
    },
    dataType: {
        type: String,
        default: '---',
        uppercase: true
    },
    signal: {
        type: String,
        default: '---',
        uppercase: true
    },
    range: {
        max: {
            type: Number
        },
        min: {
            type: Number
        },
        units: {
            type: String,
        },
    },
    multistate: {
        0: {type: String, uppercase: true},
        1: {type: String, uppercase: true},
        2: {type: String, uppercase: true},
        3: {type: String, uppercase: true},
        4: {type: String, uppercase: true},
        5: {type: String, uppercase: true},
        6: {type: String, uppercase: true},
        7: {type: String, uppercase: true},
        8: {type: String, uppercase: true},
        9: {type: String, uppercase: true},
        10: {type: String, uppercase: true},
        11: {type: String, uppercase: true},
        12: {type: String, uppercase: true},
        13: {type: String, uppercase: true},
        14: {type: String, uppercase: true},
        15: {type: String, uppercase: true},
    },
    configurationTime: {
        type: Number
    },
    user: {
        type: String
    },
    state: {
        type: Boolean,
        default: true
    },
    notes: [NoteSchema]

},{
    timestamps: true
});

//_______________________________________________________________________________________________________________
//TRANSFORMACION DE RESPUESTA DE REGISTRO
VariableSchema.methods.toJSON = function() {
    const { __v, _id, ...variable } = this.toObject();
    variable.uid = _id;
    return variable;
}

const Variable = model( 'Variable', VariableSchema );

//_______________________________________________________________________________________________________________
//EXPORTACION DE MODULOS DE CONTROL
module.exports = {
    Variable,
    VariableSchema
};