
const express = require('express');
const bookController =  require('../controllers/book.controller');

const router = express.Router();

router.route('/')
    .get(bookController.findAll)
    .post(bookController.create);

router.route('/:slug')
    .get(bookController.findOne)

module.exports = router;
