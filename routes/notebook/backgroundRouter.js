const express = require('express')
const backgroundController = require('../../controllers/notebook/backgroundController')

const router = express.Router()

router.get('/', backgroundController.getBackgrounds)
router.get('/:backgroundId', backgroundController.getBackground)
router.post('/', backgroundController.addBackground)
router.delete('/:backgroundId', backgroundController.removeBackground)

module.exports = router
