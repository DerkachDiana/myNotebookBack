const {Page} = require('../../models/models');

class PageController {
    async getAllPages(req, res) {
        const pages = await Page.findAll();
        return res.json(pages);
    }

    async getPage(req, res) {
        const {pageId} = req.params;
        const page = await Page.findOne({
            where: {
                id: pageId
            }
        });
        return res.json(page);
    }

    async addPage(req, res) {
        const {name, text, notebookId} = req.body;
        const newPage = await Page.create({name, text, notebookId});
        return res.json(newPage);
    }

    async updatePage(req, res) {
        const {pageId} = req.params;
        const {name, text, notebookId} = req.body;
        const updatedPage = await Page.update({name, text, notebookId}, {
            where: {
                id: pageId
            }
        });
        return res.json(updatedPage);
    }

    async removePage(req, res) {
        const {pageId} = res.params;
        const deletedPage = await Page.destroy({
            where: {
                id: pageId
            }
        });
        return res.json(deletedPage);
    }
}

module.exports = new PageController();
