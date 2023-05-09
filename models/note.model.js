const { Schema, model } = require('mongoose');

//Esquema de registro
const NoteSchema = Schema({
    note: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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

const note = model( 'Note', NoteSchema );

//Exportación de módulos
module.exports = {
    note,
    NoteSchema
}