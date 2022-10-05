const express = require('express');
const notebookRouter = require('./notebook/notebookRouter');
const userRouter = require('./userRouter');

const router = express.Router();

router.use('/user',  userRouter);
router.use('/notebook', notebookRouter);

module.exports = router;
