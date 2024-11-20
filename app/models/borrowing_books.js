
const mongoose = require('mongoose');
const { Schema } = mongoose;

const BorrowingBooksSchema = new Schema({
    readerId: {
        type: Schema.Types.ObjectId,
        ref: 'Reader', // Liên kết tới Reader
        required: [true, 'Reader Id is required'],
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book', // Liên kết tới Book
        required: [true, 'Book Id is required'],
    },
    borrowDate: {
        type: Date,
        default: Date.now, // Ngày mượn mặc định là hiện tại
    },
    returnDate: {
        type: Date,
        default: null, // Ngày trả (mặc định null nếu chưa trả)
    },
    isReturned: {
        type: Boolean,
        default: false, // Trạng thái mặc định là chưa trả
    },
}, {
    timestamps: true, // Thêm `createdAt` và `updatedAt`
});

module.exports = mongoose.model('BorrowingBooks', BorrowingBooksSchema);
