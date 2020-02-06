const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();

router.get('/signup', userController.getSignUp);

module.exports = router;
