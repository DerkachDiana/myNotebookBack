const {NotebookCover} = require('../../models/models')

class CoverController {
  async getCovers (req, res) {
    const covers = NotebookCover.findAll()
    return res.json(covers)
  }

  async getCover (req, res) {
    const {coverId} = req.params
    const cover = await NotebookCover.findOne({
      where: {id: coverId}
    })
    return res.json(cover)
  }

  async addCover (req, res) {
    const {url} = req.body
    const cover = await NotebookCover.create({url})
    return res.json(cover)
  }

  async removeCover (req, res) {
    const {coverId} = req.params
    const deletedCover = await NotebookCover.destroy({
      where: {
        id: coverId
      }
    })
    return res.json(deletedCover)
  }
}

module.exports = new CoverController()
