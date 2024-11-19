
const requireAuth = (req, res, next) => {
    if (req.session.user) {
        return next(); // Session hợp lệ
    }
    return res.status(401).json({ message: 'Unauthorized' }); // Nếu không, trả lỗi
};

module.exports = { requireAuth };
