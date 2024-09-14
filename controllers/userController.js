const userService = require('../services/userService');

exports.createUser = async (req, res) => {
    try {
        const userData = req.body;
        const user = await userService.createUser(userData);
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send('Error creating user.');
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send('Error retrieving users.');
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send('User not found.');
        }
    } catch (error) {
        res.status(500).send('Error retrieving user.');
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userData = req.body;
        const user = await userService.updateUser(req.params.id, userData);
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send('User not found.');
        }
    } catch (error) {
        res.status(500).send('Error updating user.');
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        if (user) {
            res.status(200).send('User deleted successfully.');
        } else {
            res.status(404).send('User not found.');
        }
    } catch (error) {
        res.status(500).send('Error deleting user.');
    }
};