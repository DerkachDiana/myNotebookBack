const express = require('express');
const pageController = require('../../controllers/notebook/pageController');

const router = express.Router();

router.get('/', pageController.getAllPages);
router.get('/:pageId', pageController.getPage);
router.post('/', pageController.addPage);
router.put('/:pageId', pageController.updatePage);
router.delete('/:pageId', pageController.removePage);

module.exports = router;
