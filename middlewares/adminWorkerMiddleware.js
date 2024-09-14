const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const verifyAdminOrWorker = async (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({ message: 'No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findByPk(decoded.id);

        if (user && (user.role === 'admin' || user.role === 'worker')) {
            next();  // Si es admin o worker, permite la acción
        } else {
            return res.status(403).send({ message: 'Access restricted to admin or worker.' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Failed to authenticate token.' });
    }
};

module.exports = verifyAdminOrWorker;
