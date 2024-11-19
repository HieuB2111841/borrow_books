
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcrypt'); 
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
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
}, {
    timestamps: true, // Tự động thêm `createdAt` và `updatedAt`
});

ReaderSchema.plugin(AutoIncrement, { inc_field: 'index' }); // Auto-increment `index`

// Middleware: Băm mật khẩu trước khi lưu
ReaderSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next(); // Chỉ băm nếu mật khẩu thay đổi hoặc mới
    }

    try {
        const salt = await bcrypt.genSalt(10); // Tạo salt
        this.password = await bcrypt.hash(this.password, salt); // Băm mật khẩu
        next();
    } catch (err) {
        next(err);
    }
});

// So sánh mật khẩu đã băm với mật khẩu nhập vào
ReaderSchema.methods.comparePassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model('Reader', ReaderSchema);
