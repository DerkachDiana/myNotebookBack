const fs = require('node:fs/promises')
const uuid = require('uuid')
const path = require('path')
const {NotebookFile} = require('../../models/models')

class FileController {
  async getFilesFromPage (req, res) {
    const {pageId} = req.params
    try {
      const files = await NotebookFile.findAll({
        where: {pageId}
      })

      return res.json(files)
    } catch (e) {
      console.log('error in getAllFilesFromPage', e)
    }
  }

  async getFile (req, res) {
    const {url} = req.params
    try {
      const file = await NotebookFile.findOne({
        where: {url}
      })

      return res.json(file)
    } catch (e) {
      console.log('error in getFile ', e)
    }
  }

  async addFile (req, res) {
    const {pageId} = req.body
    const {url} = req.files
    const fileName = uuid.v4() + '.jpg'
    await url.mv(path.resolve(__dirname, '../..', 'static', fileName))

    try {
      const file = await NotebookFile.create({pageId, url: fileName})

      return res.json(file)
    } catch (e) {
      console.log('error in addFiles:', e)
    }
  }

  async removeFile (req, res) {
    const {fileId} = req.params
    try {
      const isDelete = await NotebookFile.destroy({
        where: {
          url: fileId
        }
      })
      await fs.rm(path.resolve(__dirname, '../..', 'static', fileId))

      return res.json(isDelete)
    } catch (e) {
      console.log('error in removeFile', e)
    }
  }
}

module.exports = new FileController()
