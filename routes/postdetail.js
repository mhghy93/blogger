const express = require('express');
const postController = require('../controllers/post');
const router = express.Router();

router.get('/posts/:postId', postController.postDetail);

module.exports = router;
