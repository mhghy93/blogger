const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();

const dbUri = 'mongodb://localhost:27017/blogger';

// DB configuration
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true})
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err));

// Routes
const indexRoute = require('./routes/index');
const signUpRoute = require('./routes/signup');
const loginRoute = require('./routes/login');

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use(indexRoute);
app.use(signUpRoute);
app.use(loginRoute);

app.listen(3000);
