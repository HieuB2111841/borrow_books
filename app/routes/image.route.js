
const express = require('express');
const { getImage } = require('../controllers/image.controller');

const router = express.Router();

router.get('/books/:filename', getImage);

module.exports = router;
