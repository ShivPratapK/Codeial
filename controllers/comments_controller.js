const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = (req, res) =>{
    const postId = req.body.post;
    const postFind = async() =>{
        try{
            
            /*----------  we are finding the Post in our DataBase by Post Id to ensure that nobody can change the Post Id in HTML by Inspecting the website  ----------*/
            const post = await Post
            .findById(postId);
            if(post){
                const createComment = async() =>{
                    const comment = await Comment.create({
                        content: req.body.content,
                        post: req.body.post,
                        user: req.user._id
                    });
                    
                    /*----------  adding Comment Ids as Array in 'comments Field' of Post Collections   ----------*/
                    const addingCommentId = async() =>{
                        await Post.updateOne({_id: postId}, {$push: {comments: comment._id}});
                    }
                    addingCommentId();
                    return res.redirect('/');
                }
                createComment();
            }
        }
        catch(err){
            console.log('error in creating ----> Comment');
            return;
        }
    }
    postFind();
}

module.exports.destroy = (req, res) =>{
    const commentFind = async() =>{
        try{
            const comment = await Comment
            .findById(req.params.id);

            if(comment.user == req.user.id){
                const postId = comment.post;
                await comment.deleteOne();
                await Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});
                return res.redirect('back');
            }
            else{
                return res.redirect('back');
            }
        }
        catch(err){
            console.log('error in deleting ---> Comment');
        }
    }
    commentFind(); 
}