const {Notebook} = require('../../models/models')
const ApiError = require('../../error/ApiError')

class NotebookController {
  async getAllNotebooks (req, res, next) {
    try {
      const notebooks = await Notebook.findAll()
      return res.json(notebooks)
    } catch (e) {
      return next(ApiError.internal(e.message))
    }
  }

  async getNotebook (req, res, next) {
    const {notebookId} = req.params
    try {
      const notebook = await Notebook.findOne({
        where: {
          id: notebookId
        }
      })
      return res.json(notebook)
    } catch (e) {
      return next(ApiError.internal(e.message))
    }
  }

  async addNotebook (req, res, next) {
    const {name, userEmail, notebookBackgroundId, notebookCoverId} = req.body
    try {
      const notebook = await Notebook.create({name, userEmail, notebookBackgroundId, notebookCoverId})
      return res.json(notebook)
    } catch (e) {
      return next(ApiError.internal(e.message))
    }
  }

  async updateNotebook (req, res, next) {
    const {notebookId} = req.params
    const {name, notebookBackgroundId, notebookCoverId, userId} = req.body
    try {
      const newNotebook = await Notebook.update({name, notebookBackgroundId, notebookCoverId, userId}, {
        where: {
          id: notebookId
        }
      })
      return res.json(newNotebook)
    } catch (e) {
      return next(ApiError.internal(e.message))
    }
  }

  async removeNotebook (req, res, next) {
    const {notebookId} = req.params
    try {
      const deletedNotebook = await Notebook.destroy({
        where: {
          id: notebookId
        }
      })

      return res.json(deletedNotebook)
    } catch (e) {
      return next(ApiError.internal(e.message))
    }
  }
}

module.exports = new NotebookController()
