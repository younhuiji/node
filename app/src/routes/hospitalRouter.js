const express = require("express");
const router = express.Router();
const hospitalController = require('../controller/hospitalController')

// get
router.get('/', hospitalController.get.localList);
router.get('/list', hospitalController.get.list);
router.get('/detail', hospitalController.get.detail);
router.get('/update', hospitalController.get.update);

// post
router.post('/create', hospitalController.post.create);

// delete
router.delete('/delete', hospitalController.deleted.delete);

// put
router.put('/update', hospitalController.put.update);


module.exports = router;
