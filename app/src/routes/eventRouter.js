const express = require('express');
const router = express.Router();
const eventController = require('../controller/eventController.js');

// get
router.get('/list', eventController.get.list);
router.get('/detail', eventController.get.detail);
router.get('/update', eventController.get.update);

// post
router.post('/create', eventController.post.create);

// delete
router.delete('/delete', eventController.deleted.delete);

// put
router.put('/update', eventController.put.update);

module.exports = router;
