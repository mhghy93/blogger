const express = require('express');
const userController = require('../controllers/user');
const { isLoggedIn, alreadyLoggedIn } = require('../middleware/auth');
const router = express.Router();

router.get('/login', alreadyLoggedIn, userController.getLogIn);

router.post('/login', alreadyLoggedIn, userController.postLogIn);

router.get('/logout',isLoggedIn, userController.logout);

module.exports = router;
