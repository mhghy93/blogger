const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');
const Post = require('../models/post');

exports.getSignUp = (req, res) => {
    res.render('signup', { title: 'Sign Up' });
};

exports.postSignUp = (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    let errors = [];

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        errors.push({ message: 'You need to fill this' });
    }
    if (password !== confirmPassword) {
        errors.push({ message: 'Password do not match' });
    }
    if (password.length < 6) {
        errors.push({ message: 'Password length must be atleast 6' });
    }

    if (errors.length > 0) {
        res.render('signup', {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            errors,
            title: 'Sign Up'
        });
    } else {
        // Check whether email already exists or not
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    errors.push({ message: 'This email already exists' });
                    res.render('signup', {
                        firstName,
                        lastName,
                        email,
                        password,
                        confirmPassword,
                        errors,
                        title: 'Sign Up'
                    });
                } else {
                    const newUser = new User({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: password
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;

                            newUser.password = hash;

                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered and can login now');
                                    res.redirect('/login');
                                })
                                .catch(err => console.log(err));
                        });
                    });
                }
            })
            .catch(err => console.log(err));
    }
};

exports.getLogIn = (req, res) => {
    res.render('login', { title: 'Log In' });
};

exports.postLogIn = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
};

exports.showUserProfile = (req, res) => {
    Post.find({ userId: req.params.userId })
        .then(post => {
            console.log(post);
            res.render('user/profile', { post: post, title: 'Profile' });
        })
        .catch(err => console.log(err));
}

exports.getEditProfile = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        console.log(user);
        res.render('user/editProfile', { user: user, title: 'Edit Profile' });
    })
    .catch(err => console.log(err));
};

exports.postEditProfile = (req, res) => {
    const updatedFirstName = req.body.firstName;
    const updatedLastName = req.body.lastName;
    const updatedEmail = req.body.email;

    User.findById(req.params.userId)
        .then(user => {
            user.firstName = updatedFirstName;
            user.lastName = updatedLastName;
            user.email = updatedEmail;
            return user.save();
        })
        .then(result => {
            console.log('Profile updated');
            res.redirect('/profile/' + req.params.userId);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.deleteProfile = (req, res) => {
    Post.deleteMany({ userId: req.params.userId })
        .then(() => {
            console.log('Posts deleted');
        })
        .catch(err => {
            console.log(err);
        });

    User.findByIdAndRemove(req.params.userId)
        .then(() => {
            console.log('Account deleted');
            req.logout();
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
};
