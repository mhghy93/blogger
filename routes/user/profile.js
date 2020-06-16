const express = require('express');
const userController = require('../../controllers/user');
const { isLoggedIn, isAuthorized } = require('../../middleware/auth');
const router = express.Router();

router.get('/profile/:userId', isLoggedIn, userController.showUserProfile);

router.get('/editProfile/:userId', isLoggedIn, isAuthorized, userController.getEditProfile);

router.put('/editProfile/:userId', isLoggedIn, isAuthorized, userController.postEditProfile);

router.delete('/deleteProfile/:userId', isLoggedIn, isAuthorized, userController.deleteProfile);

module.exports = router;
