//===============================================================================================================
//TITLE: ELEMENTS MODEL
//DESCRIPTION: CONTROLADOR DE GESTOR DE DATOS DE ROL DE USUARIOS
//AUTH: Carlos Jimenez @cjhirashi
//      Marcelo Piña @mpina
//===============================================================================================================

//LIBRERIAS GLOBALES
const { Schema, model } = require('mongoose');

//LIBRERIAS LOCALES
const { NoteSchema } = require('../global/note.model');
const { VariableSchema } = require('./variable.model');

//_______________________________________________________________________________________________________________
//ESQUEMA DE REGISTRO
const ElementSchema = Schema({
    name: {
        type: String,
        uppercase: true,
        required: true
    },
    description: {
        type: String,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
    variables: [VariableSchema],
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
ElementSchema.methods.toJSON = function() {
    const { __v, _id, ...element } = this.toObject();
    element.uid = _id;
    return element;
}

const Element = model( 'Element', ElementSchema );

//_______________________________________________________________________________________________________________
//EXPORTACION DE MODULOS DE CONTROL
module.exports = {
    Element,
    ElementSchema
};