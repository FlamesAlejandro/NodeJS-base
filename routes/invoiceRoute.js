const express = require('express');
const invoiceController = require('../controllers/invoiceController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware.verifyToken, invoiceController.createInvoice);

router.get('/:id', authMiddleware.verifyToken, invoiceController.getInvoiceDetails);


module.exports = router;
