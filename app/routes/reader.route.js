
const express = require('express');
const router = express.Router();
const readerController = require('../controllers/reader.controller');

// /readers/ -> Tạo mới Reader
router.post('/', readerController.createReader);

// /readers/ -> Lấy tất cả Readers
router.get('/', readerController.getAllReaders);

// /readers/index/:index -> Lấy thông tin chi tiết Reader theo index
router.get('/index/:index', readerController.getReader);

// /readers/index/:index -> Cập nhật Reader theo index
router.put('/index/:index', readerController.updateReader);

// /readers/index/:index -> Xóa Reader theo index
router.delete('/index/:index', readerController.deleteReader);

module.exports = router;
