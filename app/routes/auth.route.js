
const express = require('express');
const authController = require('../controllers/auth.controller');
const { requireAuth } = require('../middleware/auth.middleware');
const router = express.Router();

// /auth/status/ -> Trạng thái
router.get('/status', authController.status);

// /auth/login/ -> Đăng nhập
router.post('/login', authController.login);

// /auth/protected/ -> Route được bảo vệ
router.get('/protected', requireAuth, authController.protected);

// /auth/logout/ -> Đăng xuất
router.post('/logout', authController.logout);

module.exports = router;
