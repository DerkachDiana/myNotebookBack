const path = require('path')
const uuid = require('uuid')
const {NotebookCover} = require('../../models/models')
const ApiError = require('../../error/ApiError')
const fs = require('node:fs/promises')

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
    const {cover} = req.files
    const coverName = uuid.v4() + '.jpg'
    await cover.mv(path.resolve(__dirname, '../..', 'img/notebookCovers', coverName))
    try {
      const cover = await NotebookCover.create({url: coverName})
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
          url: coverId
        }
      })

      await fs.rm(path.resolve(__dirname, '../..', 'img/notebookCovers', coverId))

      return res.json(deletedCover)
    } catch (e) {
      return next(ApiError.internal(e.message))
    }
  }
}

module.exports = new CoverController()
