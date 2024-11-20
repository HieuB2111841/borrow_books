const BorrowingBooks = require('../models/borrowing_books');
const Book = require('../models/book');
const Reader = require('../models/reader');

class BorrowingBooksController {

    // Lấy danh sách mượn sách
    async getBorrowingList (req, res) {
        try {
            const borrowings = await BorrowingBooks.find()
                .populate('readerId', 'firstName lastName') // Populate Reader
                .populate('bookId', 'name'); // Populate Book

            return res.status(200).json({ 
                success: true,
                message: 'Get borrow list successfully',
                data: borrowings 
            });
        } 
        catch (error) {
            return res.status(500).json({ 
                success: false,
                message: 'Internal server error', 
                error: error.message 
            });
        }
    };

    // Mượn sách
    async borrowBook (req, res) {
        try {
            const { readerId, bookId, borrowDate } = req.body;

            // Kiểm tra xem Reader và Book có tồn tại không
            const reader = await Reader.findById(readerId);
            
            if (!reader) {
                return res.status(404).json({ 
                    success: false,
                    message: 'Reader not found',
                });
            }

            const book = await Book.findById(bookId);
            if (!book) {
                return res.status(404).json({ 
                    success: false,
                    message: 'Book not found',
                });
            }

            if (book.bookNumber <= 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Book is out of stock',
                });
            }

            // const borrowed = await BorrowingBooks.findOne({
            //     readerId: reader._id,
            //     bookId: book._id,
            // });

            // // Tồn tại reader đã mượn sách
            // if(borrowed) {

            // }

            // Tạo mới borrowing record
            const borrowing = new BorrowingBooks({ 
                readerId, 
                bookId, 
                borrowDate: borrowDate ?? Date.now(),
            });
            await borrowing.save();

            // Giảm số lượng sách
            book.bookNumber -= 1;
            await book.save();

            return res.status(201).json({ 
                success: true,
                message: 'Book borrowed successfully', 
                data: borrowing,
            });
        } 
        catch (error) {
            return res.status(500).json({ 
                success: false,
                message: 'Internal server error', 
                error: error.message 
            });
        }
    };

    // Trả sách
    async returnBook(req, res) {
        try {
            const { id } = req.params;

            // Cập nhật trạng thái trả sách và trả về kết quả sau cập nhật
            const borrowing = await BorrowingBooks.findOneAndUpdate(
                { _id: id }, // Điều kiện tìm kiếm
                { 
                    isReturned: true, 
                    returnDate: new Date(),
                }, // Dữ liệu cập nhật
                { 
                    new: true, // Trả về bản ghi sau khi cập nhật
                    runValidators: true, // Chạy các ràng buộc schema
                }
            );

            // Kiểm tra nếu không tìm thấy
            if (!borrowing) {
                return res.status(404).json({
                    success: false,
                    message: 'Borrowing record not found',
                });
            }

            // Tăng lại số lượng sách trong collection Book
            const book = await Book.findById(borrowing.bookID);
            if (book) {
                book.bookNumber += 1;
                await book.save();
            }

            return res.status(200).json({
                success: true,
                message: 'Book returned successfully',
                data: borrowing,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message,
            });
        }
    };

}

module.exports = new BorrowingBooksController;
