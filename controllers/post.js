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

exports.postDetail = (req, res) => {
    Post.findById(req.params.postId)
        .populate('userId')
        .then(post => {
            console.log(post);
            res.render('postDetail', { post: post, title: 'Post detail' });
        })
        .catch(err => console.log(err));
};

exports.getEditPost = (req, res) => {
    Post.findById(req.params.postId)
        .then(post => {
            res.render('user/editPost', { post: post, title: 'Edit Post'})
        })
        .catch(err => console.log(err));
};

exports.postEditPost = (req, res) => {
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.pic;
    const updatedContent = req.body.content;
    const userId = req.user._id;

    Post.findById(req.params.postId)
        .then(post => {
            post.title = updatedTitle;
            post.pic = updatedImageUrl;
            post.content = updatedContent;
            post.userId = userId;
            return post.save();
        })
        .then(result => {
            console.log('Post updated');
            res.redirect('/posts/' + req.params.postId);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.deletePost = (req, res) => {
    Post.findByIdAndRemove(req.params.postId)
        .then(() => {
            console.log('Post deleted');
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
};
