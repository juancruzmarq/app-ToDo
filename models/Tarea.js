const { Schema, model} = require('mongoose')

const tareaSchema = new Schema({
    autor:{
        type: Schema.Types.ObjectId, ref: 'User'
    },
    descripcion: {
        type: String
    },
    fecha: {
        type: Date
    }
})

module.exports = model('Tarea', tareaSchema);
