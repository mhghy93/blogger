const express = require('express');
const userController = require('../../controllers/user');
const { isLoggedIn } = require('../../middleware/auth');
const router = express.Router();

router.get('/profile/:userId', isLoggedIn, userController.showUserProfile);

router.get('/editProfile/:userId', isLoggedIn, userController.getEditProfile);

router.put('/editProfile/:userId', isLoggedIn, userController.postEditProfile);

module.exports = router;
