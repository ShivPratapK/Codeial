const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    
    /*----------  include the array of Ids of all Comments in this Post Schema itself  ----------*/
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
},
    {timestamps: true}
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;