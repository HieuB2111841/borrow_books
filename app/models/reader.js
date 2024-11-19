
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { Schema } = mongoose;

const ReaderSchema = new Schema({
    index: {
        type: Number,
    },
    firstName: { 
        type: String,
        required: [true, 'First name is required'], // Ràng buộc không được để trống
        trim: true,
        maxLength: [50, 'First name cannot exceed 50 characters'], // Giới hạn ký tự
    },
    lastName: { 
        type: String,
        required: [true, 'Last name is required'], // Ràng buộc không được để trống
        trim: true,
        maxLength: [50, 'Last name cannot exceed 50 characters'], // Giới hạn ký tự
    },
    birthday: {
        type: Date,
        default: null, // Không nên dùng `Date.now()` vì giá trị này mặc định chỉ nên cho ngày tạo
        validate: {
            validator: function (value) {
                return value < new Date(); // Ngày sinh phải trước ngày hiện tại
            },
            message: 'Birthday must be in the past',
        },
    },
    isMale: { 
        type: Boolean, 
        default: true, // Mặc định là nam
    },
    phoneNumber: { 
        type: String, 
        required: [true, 'Phone number is required'], // Bắt buộc phải có
        trim: true,
        maxLength: [10, 'Phone number must not exceed 10 digits'], // Tối đa 10 chữ số
        match: [/^\d{10}$/, 'Phone number must contain exactly 10 digits'], // Regex: chỉ chứa số và dài đúng 10 ký tự
    },
    address: { 
        type: String, 
        default: '', // Giá trị mặc định
        trim: true,
        maxLength: [100, 'Address cannot exceed 100 characters'], // Giới hạn ký tự
    },
}, {
    timestamps: true, // Tự động thêm `createdAt` và `updatedAt`
});

ReaderSchema.plugin(AutoIncrement, { inc_field: 'index' }); // Auto-increment `index`

module.exports = mongoose.model('Reader', ReaderSchema);
