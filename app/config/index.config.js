
require('dotenv').config();

// Kiểm tra nếu SESSION_SECRET không được cấu hình
if (!process.env.SESSION_SECRET) {
    console.error('Error: SESSION_SECRET is not set in the environment variables.');
    process.exit(1); // Thoát ứng dụng với mã lỗi
}

const config = {
    app: {
        port: process.env.PORT || 3000,
    },
    db: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/borrow_books',
    },
    session: {
        secret: process.env.SESSION_SECRET || 'ztkep3b5tb9josx5z7skb89okmfjbcb8',
    },
};

module.exports = config;
