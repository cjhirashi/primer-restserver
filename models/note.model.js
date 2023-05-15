const { Schema, model } = require('mongoose');

//Esquema de registro
const NoteSchema = Schema({
    note: {
        type: String,
        required: true
    },
    user: {
        type: String,
        //required: true
    }

},{
    timestamps: true
});

NoteSchema.methods.toJSON = function() {
    const { __v, _id, ...note } = this.toObject();
    note.uid = _id;
    return note;
}

const Note = model( 'Note', NoteSchema );

//Exportación de módulos
module.exports = {
    Note,
    NoteSchema
}