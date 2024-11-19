
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const config = require('../config/index.config'); // Đường dẫn tới file config của bạn

// Tạo và cấu hình store để lưu trữ session trong MongoDB
const store = new MongoDBStore({
    uri: config.db.uri, // Chuỗi kết nối MongoDB
    collection: 'sessions', // Tên collection lưu session
});

// Xử lý lỗi từ MongoDBStore
store.on('error', (error) => {
    console.error('Session Store Error:', error);
});

// Hàm để cấu hình session middleware
const sessionMiddleware = session({
    secret: config.session.secret, // Khóa bí mật 
    resave: false, // Không lưu session nếu không thay đổi
    saveUninitialized: false, // Không lưu session trống
    store: store, // Sử dụng MongoDBStore để lưu session
    cookie: {
        httpOnly: true,
        secure: false, // Đặt true nếu sử dụng HTTPS
        maxAge: 1000 * 60 * 60 * 24, // Thời gian sống của cookie (1 ngày)
    },
});

module.exports = sessionMiddleware;
