const Post = require('../models/post');
const Comment = require('../models/comment');
const router = require('../routes');


module.exports.create = (req, res) =>{
    const contentCreate = async() =>{
        try{
            const post = await Post.create({
                content: req.body.content,
                user: req.user._id
            });
            return res.redirect('back');
        }
        catch(err){
            console.log('error in creating a post');
            return;
        }
    }
    contentCreate();
}


/*----------  Deleting Post  ----------*/
module.exports.destroy = (req, res) => {
    const postFind = async() =>{
        try{
            const post = await Post
            .findById(req.params.id);

            // .id means converting object in string
            if(post.user == req.user.id){
                await post.deleteOne();
                
                const deleteComment = async() =>{
                    try{
                        await Comment.deleteMany({post: req.params.id});
                        return res.redirect('back');
                    }
                    catch(err){
                        console.log('error in deleting ---> Comment');
                        res.redirect('back');
                    }
                }
                deleteComment();
            }
        }
        catch(err){
            console.log('error in finding---> Post');
            return res.redirect('back');
        }
    }
    postFind();
}
