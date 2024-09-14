const express = require('express');
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware.verifyToken, productController.createProduct);
router.get('/', authMiddleware.verifyToken, productController.getAllProducts);
router.get('/:id', authMiddleware.verifyToken, productController.getProductById);
router.put('/:id', authMiddleware.verifyToken, productController.updateProduct);
router.delete('/:id', authMiddleware.verifyToken, productController.deleteProduct);

module.exports = router;