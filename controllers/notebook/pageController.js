const {Page} = require('../../models/models')
const ApiError = require('../../error/ApiError')

class PageController {
  async getAllPages (req, res, next) {
    try {
      const pages = await Page.findAll()
      return res.json(pages)
    } catch (e) {
      return next(ApiError.internal(e.message))
    }
  }

  async getPage (req, res, next) {
    const {pageId} = req.params
    try {
      const page = await Page.findOne({
        where: {
          id: pageId
        }
      })
      return res.json(page)
    } catch (e) {
      return next(ApiError.internal(e.message))
    }
  }

  async addPage (req, res, next) {
    const {name, text, notebookId} = req.body
    try {
      const newPage = await Page.create({name, text, notebookId})
      return res.json(newPage)
    } catch (e) {
      return next(ApiError.internal(e.message))
    }
  }

  async updatePage (req, res, next) {
    const {pageId} = req.params
    const {name, text, notebookId} = req.body
    try {
      const updatedPage = await Page.update({name, text, notebookId}, {
        where: {
          id: pageId
        }
      })
      return res.json(updatedPage)
    } catch (e) {
      return next(ApiError.internal(e.message))
    }
  }

  async removePage (req, res, next) {
    const {pageId} = res.params
    try {
      const deletedPage = await Page.destroy({
        where: {
          id: pageId
        }
      })
      return res.json(deletedPage)
    } catch (e) {
      return next(ApiError.internal(e.message))
    }
  }
}

module.exports = new PageController()
