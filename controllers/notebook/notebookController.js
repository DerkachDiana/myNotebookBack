const {Notebook} = require('../../models/models')

class NotebookController {
  async getAllNotebooks (req, res) {
    const notebooks = await Notebook.findAll()
    return res.json(notebooks)
  }

  async getNotebook (req, res) {
    const {notebookId} = req.params
    const notebook = await Notebook.findOne({
      where: {
        id: notebookId
      }
    })
    return res.json(notebook)
  }

  async addNotebook (req, res) {
    const {name, userId, notebookBackgroundId, notebookCoverId} = req.body
    const notebook = await Notebook.create({name, userId, notebookBackgroundId, notebookCoverId})
    return res.json(notebook)
  }

  async updateNotebook (req, res) {
    const {notebookId} = req.params
    const {name, notebookBackgroundId, notebookCoverId, userId} = req.body
    const newNotebook = await Notebook.update({name, notebookBackgroundId, notebookCoverId, userId}, {
      where: {
        id: notebookId
      }
    })
    return res.json(newNotebook)
  }

  async removeNotebook (req, res) {
    const {notebookId} = req.params
    const deletedNotebook = await Notebook.destroy({
      where: {
        id: notebookId
      }
    })
    return res.json(deletedNotebook)
  }
}

module.exports = new NotebookController()
