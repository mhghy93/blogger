const Post = require('../models/post');

exports.getPostData = (req, res) => {
    res.render('index', { title: 'Home' });
};
