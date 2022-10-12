const express = require('express')
const notebookController = require('../../controllers/notebook/notebookController')
const backgroundRouter = require('./backgroundRouter')
const coverRouter = require('./coverRouter')
const fileRouter = require('./fileRouter')
const pageRouter = require('./pageRouter')

const router = express.Router()

router.use('/background', backgroundRouter)
router.use('/cover', coverRouter)
router.use('/file', fileRouter)
router.use('/page', pageRouter)

router.get('/', notebookController.getAllNotebooks)
router.get('/:notebookId', notebookController.getNotebook)
router.post('/', notebookController.addNotebook)
router.delete('/:notebookId', notebookController.removeNotebook)
router.put('/:notebookId', notebookController.updateNotebook)

module.exports = router
