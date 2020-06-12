const Post = require('../models/post');

exports.getAddPost = (req, res) => {
    res.render('user/addPost', { title: 'Add Post' });
};

exports.postAddPost = (req, res) => {
    const { title, pic, content } = req.body;
    const userId = req.user._id;
    
    const newPost = new Post({
        title: title,
        pic: pic,
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

exports.postList = (req, res) => {
    Post.find({ userId: req.params.userId })
        .then(post => {
            res.render('user/postList', { post: post, title: 'Post List' });
        })
        .catch(err => console.log(err));
};

exports.postDetail = (req, res) => {
    Post.findById(req.params.postId)
        .populate('userId')
        .then(post => {
            console.log(post);
            res.render('postDetail', { post: post, title: 'Post detail' });
        })
        .catch(err => console.log(err));
};
