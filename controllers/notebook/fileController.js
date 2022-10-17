const fs = require('node:fs/promises')
const uuid = require('uuid')
const path = require('path')
const {NotebookFile} = require('../../models/models')
const ApiError = require('../../error/ApiError')

class FileController {
  async getFilesFromPage (req, res, next) {
    const {pageId} = req.params
    try {
      const files = await NotebookFile.findAll({
        where: {pageId}
      })

      return res.json(files)
    } catch (e) {
      return next(ApiError.internal(e.message))
    }
  }

  async getFile (req, res, next) {
    const {url} = req.params
    try {
      const file = await NotebookFile.findOne({
        where: {url}
      })

      return res.json(file)
    } catch (e) {
      return next(ApiError.internal(e.message))
    }
  }

  async addFile (req, res, next) {
    const {pageId} = req.body
    const {url} = req.files
    const fileName = uuid.v4() + '.jpg'
    await url.mv(path.resolve(__dirname, '../..', 'img/static', fileName))

    try {
      const file = await NotebookFile.create({pageId, url: fileName})

      return res.json(file)
    } catch (e) {
      return next(ApiError.internal(e.message))
    }
  }

  async removeFile (req, res, next) {
    const {fileId} = req.params
    try {
      const isDelete = await NotebookFile.destroy({
        where: {
          url: fileId
        }
      })
      await fs.rm(path.resolve(__dirname, '../..', 'img/static', fileId))

      return res.json(isDelete)
    } catch (e) {
      return next(ApiError.internal(e.message))
    }
  }
}

module.exports = new FileController()
