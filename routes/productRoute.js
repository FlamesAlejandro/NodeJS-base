const express = require('express');
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const verifyAdminOrWorker = require('../middlewares/adminWorkerMiddleware');
const verifyAdmin = require('../middlewares/adminOnlyMiddleware');
const router = express.Router();

router.post('/create', authMiddleware.verifyToken, verifyAdminOrWorker, productController.createProduct);

router.put('/:id', authMiddleware.verifyToken, verifyAdminOrWorker, productController.updateProduct);

router.delete('/:id', authMiddleware.verifyToken, verifyAdmin, productController.deleteProduct);

router.get('/', authMiddleware.verifyToken, productController.getAllProducts);

router.get('/:id', authMiddleware.verifyToken, productController.getProductById);

module.exports = router;
