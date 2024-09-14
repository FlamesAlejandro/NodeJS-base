const typeService = require('../services/typeService');

exports.createType = async (req, res) => {
    try {
        const typeData = req.body;
        const type = await typeService.createType(typeData);
        res.status(201).send(type);
    } catch (error) {
        res.status(500).send('Error creating type.');
    }
};

exports.getAllTypes = async (req, res) => {
    try {
        const types = await typeService.getAllTypes();
        res.status(200).send(types);
    } catch (error) {
        res.status(500).send('Error retrieving types.');
    }
};

exports.getTypeById = async (req, res) => {
    try {
        const type = await typeService.getTypeById(req.params.id);
        if (type) {
            res.status(200).send(type);
        } else {
            res.status(404).send('Type not found.');
        }
    } catch (error) {
        res.status(500).send('Error retrieving type.');
    }
};

exports.updateType = async (req, res) => {
    try {
        const typeData = req.body;
        const type = await typeService.updateType(req.params.id, typeData);
        if (type) {
            res.status(200).send(type);
        } else {
            res.status(404).send('Type not found.');
        }
    } catch (error) {
        res.status(500).send('Error updating type.');
    }
};

exports.deleteType = async (req, res) => {
    try {
        const type = await typeService.deleteType(req.params.id);
        if (type) {
            res.status(200).send('Type deleted successfully.');
        } else {
            res.status(404).send('Type not found.');
        }
    } catch (error) {
        res.status(500).send('Error deleting type.');
    }
};