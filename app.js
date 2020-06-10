const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const app = express();

// Passport configuration
require('./config/passport')(passport)

const dbUri = 'mongodb://localhost:27017/blogger';

// DB configuration
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true})
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err));

// Routes
const indexRoute = require('./routes/index');
const signUpRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const profileRoute = require('./routes/user/profile');
const postRoute = require('./routes/user/post');
const postDetailRoute = require('./routes/postdetail');

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Session
app.use(session({
    secret: 'tipokjjfaf',
    resave: false,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
    res.locals.loggedUser = req.user;
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use(indexRoute);
app.use(signUpRoute);
app.use(loginRoute);
app.use(profileRoute);
app.use(postRoute);
app.use(postDetailRoute);

app.listen(3000);
