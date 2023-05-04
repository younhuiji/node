const express = require("express");
const router = express.Router();
const informController = require('../controller/informController.js');

// get
router.get('/list', informController.get.list);
router.get('/detail', informController.get.detail);
router.get('/update', informController.get.update);

// post
router.post('/create', informController.post.create);

// delete
router.delete('/delete', informController.deleted.delete);

// put
router.put('/update', informController.put.update);

module.exports = router;