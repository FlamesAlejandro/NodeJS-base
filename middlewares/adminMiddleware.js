const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const verifyAdmin = async (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findByPk(decoded.id);

        if (user && user.role === 'admin') {
            next();  // Permite que continúe la solicitud
        } else {
            return res.status(403).send({ message: 'Admin access required.' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Failed to authenticate token.' });
    }
};

module.exports = verifyAdmin;
