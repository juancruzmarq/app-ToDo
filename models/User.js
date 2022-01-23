const bcrypt = require('bcryptjs/dist/bcrypt');
const { Schema, model} = require('mongoose');


const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio'],
        unique: true,
        min: [5, 'Minimo 5 caracteres']
    },
    email: {
        required: [true, 'El mail es obligatorio'],
        unique: true,
        match: /.+\@.+\..+/,
        type: String
    },
    password:{
        required: [true, 'La contraseña es obligatoria'],
        type: String,
        min: [6, 'Minimo 6 caracteres'],
        max: [200, 'Maximo 200 caracteres']
    },
    tareas: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tarea'
        }
    ]

});

userSchema.methods.encriptacion = async(password)=>{
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salt);
}

userSchema.methods.validacion = function (password){
    return bcrypt.compare(password, this.password);
}


module.exports = model('User', userSchema);

