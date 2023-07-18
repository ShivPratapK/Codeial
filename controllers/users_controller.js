/*----------  Requiring User Collection from models folder  ----------*/
const User = require('../models/user');


module.exports.profile = (req, res) =>{
    return res.render('user_profile', {
        title: 'Users'
    });
}


/*----------  Render the Sign Up page  ----------*/
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: 'Codeial | Sign Up'
    });
}


/*----------  Render the Sign In page  ----------*/
module.exports.signIn = (req, res) =>{
    return res.render('user_sign_in', {
        title: 'Codeial | Sign In'
    });
}


/*----------  Get the Sign Up Data  ----------*/
module.exports.create = (req, res) =>{
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    const user = async() =>{
        try{
            const result = await User
            .findOne({email: req.body.email});
            if(!result){
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
    // User.findOne({email: req.body.email}, (err, user) =>{
    //     if(err){
    //         console.log('error in finding user in signing up');
    //         return;
    //     }
    //     if(!user){
    //         User.create(req.body, (err, user) =>{
    //             if(err){
    //                 console.log('error in creating user while signing up');
    //                 return;
    //             }
    //             return res.redirect('/users/sign_in');
    //         });
    //     }else{
    //         return res.redirect('back');

    user();
}

