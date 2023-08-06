const Post = require('../models/post');
const User = require('../models/user');


/*----------  finding Post Content along with User and send to ---> home.ejs file  ----------*/
let home = (req, res) =>{
    // console.log(req.cookies);
    const postFind = async() =>{
        try{
            
            /*----------  Populate function---> Replace the ObjectId references with actual Document Data ----------*/
            const posts = await Post
            .find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });
            let users = await User.find({});
            return res.render('home', {
                title:'Codeial | Home',
                posts: posts,
                all_users: users
            });
        }
        catch(err){
            console.log(`Error ${err}`);
        }
    }
    postFind();
}

module.exports = home;



/*=============================================
=            Code is to understand populat function            =
=============================================*/

const postFind = async() =>{
    try{
        const posts = await Post
        .find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
        console.log(posts);
    }
    catch(err){
        console.log(err);
    }
}  
postFind();



/*----------  Example of retrieving data of Post model  with Populating User data----------*/
/*
{
    comments: [],
    _id: new ObjectId("64c0b09e50399c077b8214f4"),
    content: 'How are you',
    user: {
      _id: new ObjectId("64b642eb8475001249a1291e"),
      email: 'rishu@gmail.com',
      password: '1234',
      name: 'rishu',
      createdAt: 2023-07-18T07:44:43.029Z,
      updatedAt: 2023-07-18T07:44:43.029Z,
      __v: 0
    },
    createdAt: 2023-07-26T05:35:26.059Z,
    updatedAt: 2023-07-26T05:35:26.059Z,
    __v: 0
  }
*/ 

/*=====  End of Code is to understand populat function  ======*/
