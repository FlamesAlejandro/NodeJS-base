const Product = require('../models/productModel');

const createProduct = async (productData) => {
    return Product.create(productData);
}

const getAllProduct = async () => {
    return Product.findAll();
}

const getProductById = async (id) => {
    return Product.findByPk(id);
}

const updateProduct = async (id, productData) => {
    const product = await Product.findByPk(id);
    if (product) return product.update(productData);
    return null;
}

const deleteProduct = async (id) => {
    const product = await Product.findByPk(id);
    if (product) return product.destroy();
    return null;
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};