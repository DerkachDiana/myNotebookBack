const {NotebookCover} = require('../../models/models')
const ApiError = require('../../error/ApiError')

class CoverController {
  async getCovers (req, res, next) {
    try {
      const covers = NotebookCover.findAll()
      return res.json(covers)
    } catch (e) {
      return next(ApiError.internal(e.message))
    }
  }

  async getCover (req, res, next) {
    const {coverId} = req.params
    try {
      const cover = await NotebookCover.findOne({
        where: {id: coverId}
      })
      return res.json(cover)
    } catch (e) {
      return next(ApiError.internal(e.message))
    }
  }

  async addCover (req, res, next) {
    const {url} = req.body
    try {
      const cover = await NotebookCover.create({url})
      return res.json(cover)
    } catch (e) {
      return next(ApiError.internal(e.message))
    }
  }

  async removeCover (req, res, next) {
    const {coverId} = req.params
    try {
      const deletedCover = await NotebookCover.destroy({
        where: {
          id: coverId
        }
      })
      return res.json(deletedCover)
    } catch (e) {
      return next(ApiError.internal(e.message))
    }
  }
}

module.exports = new CoverController()
