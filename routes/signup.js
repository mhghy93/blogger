const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();

router.get('/signup', userController.getSignUp);

router.post('/signup', userController.postSignUp);

module.exports = router;
