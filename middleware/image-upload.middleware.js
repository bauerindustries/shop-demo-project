const multer = require('multer');
const uuid = require('uuid').v4;

// multer configuration
const upload = multer({
  storage: multer.diskStorage({
    destination: 'product-data/images',
    filename: function (req, file, cb) {
      cb(null, uuid() + '-' + file.originalname);
    },
  }),
});

// 'image' is input name from new product form in /views/admin/products/new-product.ejs
const configuredMulterMiddleware = upload.single('image');

module.exports = configuredMulterMiddleware;
