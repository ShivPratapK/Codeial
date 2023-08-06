/*----------  Requiring User Collection from models folder  ----------*/
const User = require('../models/user');
const router = require('../routes');



/*----------  Render the Profile page  ----------*/
module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}


/*----------  Render the Sign Up page  ----------*/
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: 'Codeial | Sign Up'
    });
}


/*----------  Render the Sign In page  ----------*/
module.exports.signIn = (req, res) =>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: 'Codeial | Sign In',
    });
}


/*----------  Get the Sign Up Data  ----------*/
module.exports.create = (req, res) =>{
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    const userCreate = async() =>{
        try{
            const user = await User
            .findOne({email: req.body.email});
            if(!user){
                User.create(req.body);
                return res.redirect('/users/sign_in')
            }
            else{
                return res.redirect('/users/sign_in');
            }
        }
        catch(err){
            console.log('error in finding user in signing up');
            return;
        }
    }
    userCreate();
}


/*----------  Sign in and Create a session for the user  ----------*/
module.exports.createSession = (req, res) =>{
    return res.redirect('/');
}


/*----------  Sign Out action  ----------*/
module.exports.destroySession = (req, res) =>{
    req.logout((err) =>
        {
            console.log(`Logout err ${err}`);
        }
    );
    return res.redirect('/');    
}



