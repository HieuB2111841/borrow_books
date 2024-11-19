
const ApiError = require('../api-error');
const Reader = require('../models/reader');

class AuthController {
    async login(req, res) {
        try {
            const { phoneNumber, password } = req.body;

            // Tìm người dùng theo số điện thoại
            const reader = await Reader.findOne({ phoneNumber });
            if (!reader) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Invalid phone number or password' 
                });
            }

            // So sánh mật khẩu
            const isMatch = await reader.comparePassword(password);
            if (!isMatch) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Invalid phone number or password' 
                });
            }

            // Lưu thông tin người dùng vào session
            req.session.reader = {
                index: reader['index'],
                name: `${reader.firstName} ${reader.lastName}`,
            };
            // console.log(`after login: req.session.reader: {index: ${req.session.reader.index}, name: ${req.session.reader.name}}`);

            return res.status(200).json({
                success: true,
                message: 'Login successful',
                reader: {
                    index: req.session.reader['index'],
                    name: req.session.reader['name'],
                },
            });
        } 
        catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Internal Server Error' 
            });
        }
    }

    // Kiểm tra trạng thái đăng nhập
    async status(req, res) {
        try {
            if (!req.session || !req.session.reader) {
                // Trả về trạng thái không đăng nhập, nhưng không lỗi
                return res.status(200).json({ 
                    success: false, 
                    message: 'Not logged in', 
                    reader: null, // Không có thông tin người dùng
                });
            }

            // Trả về trạng thái đăng nhập thành công
            res.status(200).json({
                success: true,
                message: 'Logged in',
                reader: req.session.reader, // Thông tin người dùng
            });

        } catch (error) {
            console.error('Error in authManager.status:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Internal Server Error' 
            });
        }
    }


    protected (req, res) {
        res.status(200).json({ 
            success: true,
            message: `Welcome ${req.session.user.username}`,
        });
    };

    logout (req, res) {
        req.session.destroy((error) => {
            if (error) {
                return next(
                    new ApiError(500, `Error when destroy session: ${ error.message }`)
                );
            }
            res.clearCookie('connect.sid'); // Xóa cookie của session
            return res.status(200).json({ 
                success: true,     
                message: 'Logout successful', 
            });
        });
    };
}


module.exports = new AuthController;
