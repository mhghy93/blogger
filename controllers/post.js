const Post = require('../models/post');

exports.getAddPost = (req, res) => {
    res.render('user/addPost', { title: 'Add Post' });
};

exports.postAddPost = (req, res) => {
    const { title, content } = req.body;
    const userId = req.user._id;
    
    const newPost = new Post({
        title: title,
        content: content,
        userId: userId
    }); 

    newPost.save()
        .then(post => {
            console.log(post);
            res.redirect('/');
        })
        .catch(err => console.log(err));
};
