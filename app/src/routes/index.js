const express = require("express");
const router = express.Router();
const controller = require('../controller/indexController');

// get
router.get('/', controller.get.index);

// post
router.post('/login', controller.post.login);
router.post('/signup', controller.post.signup);

module.exports = router;