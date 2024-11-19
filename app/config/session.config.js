
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const config = require('./index.config'); // Đường dẫn tới file config của bạn

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
    secret: 'your_secret_key', // Khóa bí mật (nên dùng biến môi trường)
    resave: false, // Không lưu session nếu không thay đổi
    saveUninitialized: false, // Không lưu session trống
    store: store, // Sử dụng MongoDBStore để lưu session
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // Thời gian sống của cookie (1 ngày)
        secure: false, // Đặt true nếu sử dụng HTTPS
    },
});

module.exports = sessionMiddleware;
