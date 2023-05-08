const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt-nodejs'); 
const { Schema } = mongoose;

const userSchema = new Schema({
    email: String,
    password: String
});

userSchema.methods.encriptarConstraseña = (password)  =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));                       
}; 

userSchema.methods.validarContraseña = function (password) {
    return bcrypt.compareSync(password, this.password); 
};
module.exports = mongoose.model('usuarios', userSchema); 