const express = require('express');
const postController = require('../../controllers/post');
const { isLoggedIn, ownPost } = require('../../middleware/auth');
const router = express.Router();

router.get('/user/addPost', isLoggedIn, postController.getAddPost);

router.post('/user/addPost', isLoggedIn, postController.postAddPost);

router.get('/editPost/:postId', isLoggedIn, ownPost, postController.getEditPost);

router.put('/user/editPost/:postId', isLoggedIn, ownPost,  postController.postEditPost);

router.delete('/user/deletePost/:postId', isLoggedIn, ownPost, postController.deletePost);

module.exports = router;
