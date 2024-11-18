
const path = require('path');
const fs = require('fs');

exports.getImage = (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, '../../public/uploads/images/books', filename);

  fs.access(filepath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({error: 'File không tồn tại.'});
    }
    res.sendFile(filepath);
  });
};
