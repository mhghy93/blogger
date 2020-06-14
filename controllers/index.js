const Post = require('../models/post');

exports.getPostData = (req, res) => {
    Post.find()
        .populate('userId')
        .then(post => {
            res.render('index', { title: 'Home', post: post });
        })
        .catch(err => console.log(err));
    
};
