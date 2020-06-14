const express = require('express');
const userController = require('../../controllers/user');
const { isLoggedIn } = require('../../middleware/auth');
const router = express.Router();

router.get('/profile/:userId', isLoggedIn, userController.showUserProfile);

module.exports = router;
