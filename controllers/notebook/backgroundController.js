const {NotebookBackground} = require('../../models/models')

class BackgroundController {
  async getBackgrounds (req, res) {
    const backgrounds = await NotebookBackground.findAll()
    return res.json(backgrounds)
  }

  async getBackground (req, res) {
    const {backgroundId} = req.params
    const background = await NotebookBackground.findOne(backgroundId)
    return res.json(background)
  }

  async addBackground (req, res) {
    const {url} = req.body
    const background = await NotebookBackground.create({url})
    return res.json(background)
  }
}

module.exports = new BackgroundController()
