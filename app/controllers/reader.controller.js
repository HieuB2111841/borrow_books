const Reader = require('../models/reader');

class ReaderController {
    // Tạo mới một Reader
    async createReader (req, res) {
        try {
            const newReader = new Reader(req.body);
            const savedReader = await newReader.save();
            res.status(201).json({
                message: 'Reader created successfully',
                data: savedReader,
            });
        } 
        catch (error) {
            res.status(400).json({
                message: 'Error creating Reader',
                error: error.message,
            });
        }
    };

    // Lấy danh sách tất cả Readers
    async getAllReaders (req, res) {
        try {
            const readers = await Reader.find();
            res.status(200).json(readers);
        } 
        catch (error) {
            res.status(500).json({
                message: 'Error retrieving readers',
                error: error.message,
            });
        }
    };

    // Lấy thông tin chi tiết của một Reader theo ID
    async getReader (req, res) {
        try {
            const reader = await Reader.findOne({'index' : req.params.index});
            if (!reader) {
                return res.status(404).json({ message: 'Reader not found' });
            }
            res.status(200).json(reader);
        } 
        catch (error) {
            res.status(400).json({
                message: 'Error retrieving Reader',
                error: error.message,
            });
        }
    };

    // Cập nhật thông tin Reader theo ID
    async updateReader (req, res) {
        try {
            const updatedReader = await Reader.findOneAndUpdate({'index' : req.params.index}, req.body, {
                new: true, // Trả về document đã cập nhật
                runValidators: true, // Chạy các ràng buộc validate
            });

            if (!updatedReader) {
                return res.status(404).json({ message: 'Reader not found' });
            }
            res.status(200).json({
                message: 'Reader updated successfully',
                data: updatedReader,
            });
        } 
        catch (error) {
            res.status(400).json({
                message: 'Error updating Reader',
                error: error.message,
            });
        }
    };

    // Xóa một Reader theo ID
    async deleteReader (req, res) {
        try {
            const deletedReader = await Reader.findByIdAndDelete(req.params.id);
            if (!deletedReader) {
                return res.status(404).json({ message: 'Reader not found' });
            }
            res.status(200).json({
                message: 'Reader deleted successfully',
                data: deletedReader,
            });
        } catch (error) {
            res.status(400).json({
                message: 'Error deleting Reader',
                error: error.message,
            });
        }
    };
}

module.exports = new ReaderController;
