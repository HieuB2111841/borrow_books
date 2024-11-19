
const ApiError = require('../api-error');
const Reader = require('../models/reader');

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

    // Lấy thông tin chi tiết của một Reader theo ID
    async getReader (req, res) {
        try {
            const reader = await Reader.findOne({'index' : req.params.index});
            if (!reader) {
                return res.status(404).json({ message: 'Reader not found' });
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
}

module.exports = new ReaderController;
