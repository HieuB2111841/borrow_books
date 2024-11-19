
const ApiError = require('../api-error');
const Reader = require('../models/reader');

class AuthController {
    
    async login (req, res) {
        try {
            const reader = new Reader(req.body);

            // Tìm người dùng theo sdt
            const findReader = await Reader.findOne({ phoneNumber : reader.phoneNumber });
            if (!findReader) {
                return res.status(400).json({ message: 'Invalid phone number or password' });
            }

            // So sánh mật khẩu nhập vào với mật khẩu đã băm
            const isMatch = await findReader.comparePassword(reader.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid phone number or password' });
            }

            req.session.reader = { 
                index: findReader.index,  
                name: `${findReader.firstName} ${findReader.lastName}`,
            }; // Lưu thông tin vào session
            return res.status(200).json({ 
                success: true,
                message: 'Login successful', 
                reader: findReader,
            });
        }
        catch (error) {
            return next(
                new ApiError(500, `Error when login: ${ error.message }`),
            );
        }
    };

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
