const express = require("express");
const router = express.Router();
const boardController = require('../controller/boardController.js');

// get
router.get('/list', boardController.get.list);
router.get('/detail', boardController.get.detail);
router.get('/update', boardController.get.update);

// post
router.post('/create', boardController.post.create);

// delete
router.delete('/delete', boardController.deleted.delete);

// put
router.put('/update', boardController.put.update);

module.exports = router;
