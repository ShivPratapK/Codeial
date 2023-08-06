const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


/*----------  Authentication using Passport  ----------*/
passport.use(new LocalStrategy(
    {usernameField: 'email'},
    (email, password, done) =>{
        
        /*----------  find User and establish the Identity  ----------*/
        const userFound = async() =>{
            try{
                const user = await User
                .findOne({email: email});
                if(!user || user.password != password){
                    console.log('Invalid Username/Password');
                    return done(null, false);
                }
                return done(null, user);
            }
            catch(err){
                console.log('error in finding user ----> Passport');
                return done(err);
            }
        }
        userFound();
    }
));


/*----------  Serialization allows to choose what User Data to store in Cookies  ----------*/
passport.serializeUser((user, done) =>{
    done(null, user.id);
});


/*----------  Deserialization lets you retrieve the User Object from key in the Cookies   ----------*/
passport.deserializeUser((id, done) =>{
    const userFound = async() =>{
        try{
            const user = await User
            .findById(id);
            return done(null, user);
        }
        catch(err){
            console.log('error in finding user ---> Passport');
            done(err);
        }
    }
    userFound();
});


/*----------  Check if user is Authenticated  ----------*/
passport.checkAuthentication = (req, res, next) =>{
    
    /*----------  if the User is Signed In, then pass on the request to the next function(controller's action)  ----------*/
    if(req.isAuthenticated()){
        return next();
    }
    
    /*----------  if the User is not Signed In  ----------*/
    return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser = (req, res, next) =>{
    if(req.isAuthenticated()){
        
        /*----------  req.user contains current Signed In user from the session cookies and we are just sending  ----------*/
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;


