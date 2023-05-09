const { Schema, model } = require('mongoose');
const { NoteSchema } = require('./note.model');

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
    },
    dataType: {
        type: String,
    },
    signal: {
        type: String,
    },
    range: {
        type: Map,
        of: Number
    },
    units: {
        type: String
    },
    multistateStatus: {
        type: Map,
        of: String
    },
    configurationTime: {
        type: Number
    },
    state: {
        type: Boolean
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