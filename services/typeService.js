const Type = require('../models/typeModel');

const createType = async (typeData) => {
    return Type.create(typeData);
};

const getAllTypes = async () => {
    return Type.findAll();
};

const getTypeById = async (id) => {
    return Type.findByPk(id);
};

const updateType = async (id, typeData) => {
    const type = await Type.findByPk(id);
    if (type) return type.update(typeData);
    return null;
};

const deleteType = async (id) => {
    const type = await Type.findByPk(id);
    if (type) return type.destroy();

    return null;
};

module.exports = {
    createType,
    getAllTypes,
    getTypeById,
    updateType,
    deleteType
};