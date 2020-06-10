const Post = require('../models/post');
const User = require('../models/user');

exports.getPostData = (req, res) => {
    Post.find()
        .populate('userId')
        .then(post => {
            res.render('index', { title: 'Home', post: post });
        })
        .catch(err => console.log(err));
    
};
