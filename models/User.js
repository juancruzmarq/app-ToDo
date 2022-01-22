const bcrypt = require('bcryptjs/dist/bcrypt');
const { Schema, model} = require('mongoose');


const userSchema = new Schema({
    username: String,
    email: String,
    password: String
});


userSchema.methods.encriptacion = async(password)=>{
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salt);
}

userSchema.methods.validacion = function (password){
    return bcrypt.compare(password, this.password);
}

module.exports = model('User', userSchema);

