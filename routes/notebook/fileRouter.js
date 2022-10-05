const express = require('express');
const fileController = require('../../controllers/notebook/fileController');

const router = express.Router();

router.get('/:fileId', fileController.getFile);
router.post('/:fileId', fileController.addFile);
router.delete('/:fileId', fileController.removeFile);

module.exports = router;
