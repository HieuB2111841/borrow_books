
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

// /readers/favorite/:index -> Lấy danh sách sách yêu thích của Reader
router.get('/favorite/:index', readerController.getFavoriteBooks);

// /readers/favorite/:index -> Thêm sách vào danh sách yêu thích của Reader
router.post('/favorite/:index', readerController.addFavoriteBook);

// /readers/favorite/:index/:bookId -> Xóa sách khỏi danh sách yêu thích
router.delete('/favorite/:index/:bookId', readerController.removeFavoriteBook);

module.exports = router;
