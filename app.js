
const express = require('express');
const cors = require('cors');
const bodyParser  = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const sessionMiddleware = require('./app/middleware/session.middleware');
const router = require('./app/routes/index.route');

const app = express();

app.use(cors({
    origin: 'http://localhost:8080', // Chỉ định domain được phép truy cập
    credentials: true, // Cho phép gửi cookie, thông tin xác thực
}));

// Cấu hình thư mục tĩnh
app.use('/uploads', express.static(path.join(__dirname, '/public/uploads/')));

app.use(express.json());
app.use(bodyParser.json());

app.use(cookieParser());
app.use(sessionMiddleware) // Sử dụng session middleware

router.route(app);

module.exports = app;
