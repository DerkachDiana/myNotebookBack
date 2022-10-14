const express = require('express')
const coverController = require('../../controllers/notebook/coverController')

const router = express.Router()

router.get('/', coverController.getCovers)
router.get('/:coverId', coverController.getCover)
router.post('/', coverController.addCover)
router.delete('/:coverId', coverController.removeCover)

module.exports = router
