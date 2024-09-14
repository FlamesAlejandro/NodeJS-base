const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const createUser = async (userData) => {
    userData.password = bcrypt.hashSync(userData.password, 8);
    return User.create(userData);
};

const getAllUsers = async () => {
    return User.findAll();
};

const getUserById = async (id) => {
    return User.findByPk(id);
};

const updateUser = async (id, userData) => {
    const user = await User.findByPk(id);
    if (user) {
        if (userData.password) {
            userData.password = bcrypt.hashSync(userData.password, 8);
        }
        return user.update(userData);
    }
    return null;
};

const deleteUser = async (id) => {
    const user = await User.findByPk(id);
    if (user) {
        return user.destroy();
    }
    return null;
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};