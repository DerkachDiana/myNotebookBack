const {NotebookBackground} = require('../../models/models')
const ApiError = require('../../error/ApiError')

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
    const {url} = req.body
    try {
      const background = await NotebookBackground.create({url})
      return res.json(background)
    } catch (e) {
      return next(ApiError.internal(e.message))
    }
  }
}

module.exports = new BackgroundController()
