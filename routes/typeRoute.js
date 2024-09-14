const express = require('express');
const typeController = require('../controllers/typeController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware.verifyToken, typeController.createType);
router.get('/', authMiddleware.verifyToken, typeController.getAllTypes);
router.get('/:id', authMiddleware.verifyToken, typeController.getTypeById);
router.put('/:id', authMiddleware.verifyToken, typeController.updateType);
router.delete('/:id', authMiddleware.verifyToken, typeController.deleteType);

module.exports = router;