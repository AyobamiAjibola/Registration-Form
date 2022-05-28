const multer = require('multer');
const path = require('path');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  const fileFilter = (req, file, cb) => {
    cb(null, true);
};

  const upload = multer({
    storage: fileStorage,
    fileFilter: fileFilter
  });

  module.exports = upload.single('image')