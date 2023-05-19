const { Schema, model } = require('mongoose');
const { NoteSchema } = require('./note.model');
const { StateSchema } = require('./state.model');

//Esquema de registro
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
        }
    },
    units: {
        type: String,
        default: '---'
    },
    multistate: [StateSchema],
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

VariableSchema.methods.toJSON = function() {
    const { __v, _id, ...variable } = this.toObject();
    variable.uid = _id;
    return variable;
}
//Exportación de módulos
module.exports = model( 'Variable', VariableSchema );