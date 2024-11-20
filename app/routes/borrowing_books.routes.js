const express = require('express');
const router = express.Router();
const borrowingBooksController = require('../controllers/borrowing_books.controller');

// /borrow/ -> Lấy danh sách mượn
router.get('/', borrowingBooksController.getBorrowingList); // Lấy danh sách mượn

// /borrow/ -> Mượn sách
router.post('/', borrowingBooksController.borrowBook); // Mượn sách

// /borrow/return/:id -> Trả sách
router.put('/return/:id', borrowingBooksController.returnBook); // Trả sách

module.exports = router;
