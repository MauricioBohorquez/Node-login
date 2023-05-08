const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const Usuario = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
   const user = await Usuario.findById(id); 
   done(null, user);
});


passport.use('local-signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true 
}, async (req, email, password, done) => {

    const usu = await Usuario.findOne({Enail: email});
    if(usu){
        return done(null, false, req.flash('signupMessage', 'Correo ya existente.'));
    }else{
        const user = new Usuario();
        user.email = email;
        user.password = user.encriptarConstraseña(password);
        await user.save();
        done(null, user);
    }

}));

passport.use('local-signin',new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true 
}, async (req, email, password, done) => {

    const user = await Usuario.findOne({email: email});
    if(!user){
        return done(null, false, req.flash('signinMessage', 'Usuario no encontrado.'));
    }
    if(!user.validarContraseña(password)) {
        return done(null, false, req.flash('signinMessage','Contraseña incorrecta'));
    }
    done(null, user);


}));