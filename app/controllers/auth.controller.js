
class AuthController {
    
    login (req, res) {
        const { username, password } = req.body;

        // Giả sử người dùng hợp lệ
        if (username === 'admin' && password === 'password') {
            req.session.user = { username }; // Lưu thông tin vào session
            return res.status(200).json({ message: 'Login successful' });
        }

        return res.status(401).json({ message: 'Invalid credentials' });
    };

    protected (req, res) {
        res.status(200).json({ message: `Welcome ${req.session.user.username}` });
    };

    logout (req, res) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Logout failed' });
            }
            res.clearCookie('connect.sid'); // Xóa cookie của session
            return res.status(200).json({ message: 'Logout successful' });
        });
    };
}


module.exports = new AuthController;
