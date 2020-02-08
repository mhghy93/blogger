const express = require('express');
const postController = require('../../controllers/post');
const { isLoggedIn } = require('../../middleware/auth');
const router = express.Router();

router.get('/user/addPost', isLoggedIn, postController.getAddPost);

router.post('/user/addPost', isLoggedIn, postController.postAddPost);

module.exports = router;
