const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const verifyAdmin = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(403).send({ message: 'No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findByPk(decoded.id);

        if (user && user.role === 'admin') {
            next();  // Si es admin, permite la acción
        } else {
            return res.status(403).send({ message: 'Access restricted to admin only.' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Failed to authenticate token.' });
    }
};

module.exports = verifyAdmin;
