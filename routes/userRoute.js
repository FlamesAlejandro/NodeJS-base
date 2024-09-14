const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const verifyAdmin = require('../middlewares/adminOnlyMiddleware');
const verifyAdminOrWorker = require('../middlewares/adminWorkerMiddleware');
const router = express.Router();

router.post('/create', authMiddleware.verifyToken, verifyAdminOrWorker, userController.createUser);

router.get('/', authMiddleware.verifyToken, verifyAdminOrWorker, userController.getAllUsers);

router.get('/:id', authMiddleware.verifyToken, userController.getUserById);

router.put('/:id', authMiddleware.verifyToken, verifyAdminOrWorker, userController.updateUser);

router.delete('/:id', authMiddleware.verifyToken, verifyAdmin, userController.deleteUser);

module.exports = router;
