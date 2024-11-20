
const ApiError = require('../api-error');
const Reader = require('../models/reader');
const urlUtils = require('../utils/url.utils');

class ReaderController {
    // Tạo mới một Reader
    async createReader (req, res) {
        try {
            const newReader = new Reader(req.body);
            
            const existingReader = await Reader.findOne({ phoneNumber : newReader.phoneNumber });
            if (existingReader) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Phone number already in use' 
                });
            }
            
            const savedReader = await newReader.save();

            res.status(201).json({
                success: true,
                message: 'Reader created successfully',
                data: savedReader,
            });
        } 
        catch (error) {
            return next(
                new ApiError(400, `Error creating Reader: ${ error.message }`),
            );
        }
    };

    // Lấy danh sách tất cả Readers
    async getAllReaders (req, res) {
        try {
            const readers = await Reader.find();
            res.status(200).json({
                success: true,
                message: 'Get readers successfully',
                data: readers,
            });
        } 
        catch (error) {
            return next(
                new ApiError(400, `Error when get all readers: ${ error.message }`),
            );
        }
    };

    // Lấy thông tin chi tiết của một Reader theo index
    async getReader (req, res) {
        try {
            const reader = await Reader.findOne({'index' : req.params.index});
            if (!reader) {
                return res.status(404).json({ 
                    success: false,
                    message: 'Reader not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Get reader successfully',
                data: reader,
            });
        } 
        catch (error) {
            return next(
                new ApiError(400, `Error when get reader: ${ error.message }`),
            );
        }
    };

    // Cập nhật thông tin Reader theo ID
    async updateReader (req, res) {
        try {
            const updatedReader = await Reader.findOneAndUpdate({'index' : req.params.index}, req.body, {
                new: true, // Trả về document đã cập nhật
                runValidators: true, // Chạy các ràng buộc validate
                overwrite: false,
            });

            if (!updatedReader) {
                return res.status(404).json({ 
                    success: false,
                    message: 'Reader not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Reader updated successfully',
                data: updatedReader,
            });
        } 
        catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error updating Reader',
                error: error.message,
            });
        }
    };

    // Xóa một Reader theo ID
    async deleteReader (req, res) {
        try {
            const deletedReader = await Reader.findOneAndDelete({'index' : req.params.index});
            if (!deletedReader) {
                return res.status(404).json({ 
                    success: false,
                    message: 'Reader not found', 
                });
            }
            res.status(200).json({
                success: true,
                message: 'Reader deleted successfully',
                data: deletedReader,
            });
        } catch (error) {
            return next(
                new ApiError(400, `Error when deleting Reader: ${ error.message }`),
            );
        }
    };

    // Lấy danh sách sách yêu thích của Reader
    async getFavoriteBooks(req, res, next) {
        try {
            const { index } = req.params; // Lấy `index` của Reader

            // Tìm Reader theo `index` và populate danh sách favorite
            const reader = await Reader.findOne({ index }).populate('favorite');
            if (!reader) {
                return res.status(404).json({
                    success: false,
                    message: 'Reader not found',
                });
            }

            const books = reader.favorite.map(book => ({
                ...book.toObject(),
                imageURL: `${urlUtils.getBaseUrl(req)}/images/books/${book.imageURL}`,
            }));

            res.status(200).json({
                success: true,
                message: 'Get favorite books successfully',
                data: books, // Trả về danh sách yêu thích
            });
        } 
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };

    // Thêm sách vào danh sách yêu thích của Reader
    async addFavoriteBook(req, res, next) {
        try {
            const { index } = req.params; // Lấy `index` của Reader
            const { bookId } = req.body; // Lấy `bookId` từ request body

            // Validate bookId
            if (!bookId || typeof bookId !== 'string') {
                return res.status(400).json({ error: "Invalid bookId" });
            }

            // Tìm Reader theo `index`
            const reader = await Reader.findOne({ index });
            if (!reader) {
                return res.status(404).json({
                    success: false,
                    message: 'Reader not found',
                });
            }

            // Kiểm tra sách đã tồn tại trong danh sách yêu thích chưa
            if (reader.favorite.includes(bookId)) {
                return res.status(200).json({
                    success: false,
                    message: 'Book is already in the favorite list',
                });
            }

            // Thêm sách vào danh sách yêu thích
            reader.favorite.push(bookId);
            await reader.save();

            res.status(200).json({
                success: true,
                message: 'Book added to favorite successfully',
                data: reader,
            });
        } catch (error) {
            return next(
                new ApiError(400, `Error when adding book to favorite: ${error.message}`)
            );
        }
    };

    // Xóa một sách khỏi danh sách yêu thích
    async removeFavoriteBook(req, res, next) {
        try {
            const { index, bookId } = req.params;

            const reader = await Reader.findOne({ index });
            if (!reader) {
                return res.status(404).json({
                    success: false,
                    message: 'Reader not found',
                });
            }

            // Xóa sách khỏi danh sách yêu thích
            reader.favorite = reader.favorite.filter(
                (id) => id.toString() !== bookId
            );

            await reader.save();

            res.status(200).json({
                success: true,
                message: 'Book removed from favorites successfully',
            });
        } catch (error) {
            return next(
                new ApiError(400, `Error when removing book from favorites: ${error.message}`)
            );
        }
    };

}

module.exports = new ReaderController;
