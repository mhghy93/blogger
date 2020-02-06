const User = require('../models/user');

exports.getSignUp = (req, res) => {
    res.render('signup', { title: 'Sign Up' });
};

exports.getLogIn = (req, res) => {
    res.render('login', { title: 'Log In' });
};
