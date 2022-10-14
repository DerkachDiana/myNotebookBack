const path = require('path')
const uuid = require('uuid')
const {
  NotebookBackground,
  NotebookFile
} = require('../../models/models')
const ApiError = require('../../error/ApiError')
const fs = require('node:fs/promises')

class BackgroundController {
  async getBackgrounds (req, res, next) {
    try {
      const backgrounds = await NotebookBackground.findAll()
      return res.json(backgrounds)
    } catch (e) {
      return next(ApiError.internal(e.message))
    }
  }

  async getBackground (req, res, next) {
    const {backgroundId} = req.params
    try {
      const background = await NotebookBackground.findOne(backgroundId)
      return res.json(background)
    } catch (e) {
      return next(ApiError.internal(e.message))
    }
  }

  async addBackground (req, res, next) {
    const {background} = req.files
    const backgroundName = uuid.v4() + '.jpg'
    await background.mv(path.resolve(__dirname, '../..', 'img/notebookBackgrounds', backgroundName))

    try {
      const background = await NotebookBackground.create({url: backgroundName})
      return res.json(background)
    } catch (e) {
      return next(ApiError.internal(e.message))
    }
  }

  async removeBackground (req, res, next) {
    const {backgroundId} = req.params
    try {
      const isDelete = await NotebookFile.destroy({
        where: {url: backgroundId}
      })

      await fs.rm(path.resolve(__dirname, '../..', 'img/notebookBackgrounds', backgroundId))

      return res.json(isDelete)
    } catch (e) {
      return next(ApiError.internal(e.message))
    }
  }
}

module.exports = new BackgroundController()
