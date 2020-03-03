const express = require('express');
const multer = require('multer');

const router = express.Router();
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads/');
    }, 
    filename(req, file, callback) {
        callback(null, new Date().toISOString() + file.originalname);
    }
});
const fileFilter = (req, file, callback) => {
    // reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true);
    } else {
        callback(null, false);
    }
}
const upload = multer({
    storage: storage, 
    limits: { 
        fileSize: 1024 * 1024 * 5 // 5 = megabyte
    },
    fileFilter: fileFilter
});

const ckeckAuth = require('../middleware/check-auth');
const ProductsController = require('../controllers/product');

router.get('/', ckeckAuth, ProductsController.get_all_products);
router.post('/', ckeckAuth, upload.single('productImage'), ProductsController.create_product);
router.get('/:productId', ckeckAuth, ProductsController.get_product_by_id);
router.patch('/:productId', ckeckAuth, ProductsController.update_product_by_id);
router.delete('/:productId', ckeckAuth, ProductsController.delete_product_by_id);

module.exports = router;

