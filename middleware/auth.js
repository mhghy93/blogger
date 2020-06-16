const Post = require('../models/post');
const User = require('../models/user');

module.exports = {
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'You must be logged in to do that');
        res.redirect('/login');
    },
    isAuthorized: (req, res, next) => {
        User.findById(req.params.userId)
            .then(user => {
                if (req.user._id.equals(req.params.userId)) {
                    return next();
                } else {
                    res.redirect('/notfound');
                }
            })
            .catch(err => {
                console.log(err);
            })
    },
    ownPost: (req, res, next) => {
        Post.findById(req.params.postId)
            .then(post => {
                if (req.user._id.equals(post.userId)) {
                    return next();
                } else {
                    res.redirect('/notfound');
                }
            })
            .catch(err => {
                console.log(err);
            })
    },
    alreadyLoggedIn: (req, res, next) => {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    }
};
