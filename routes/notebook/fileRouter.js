const express = require('express')
const fileController = require('../../controllers/notebook/fileController')

const router = express.Router()

router.get('/:url', fileController.getFile)
router.post('/', fileController.addFile)
router.post('/:pageId', fileController.getFilesFromPage)
router.delete('/:fileId', fileController.removeFile)

module.exports = router
