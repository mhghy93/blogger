const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');

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
