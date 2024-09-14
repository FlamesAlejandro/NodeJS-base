const productService = require('../services/productService');

exports.createProduct = async (req, res) => {
    try {
        const productData = req.body;
        const product = await productService.createProduct(productData);
        res.status(201).send(product);
    } catch (error) {
        res.status(500).send('Error creating product.');
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send('Error retrieving products.');
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (product) {
            res.status(200).send(product);
        } else {
            res.status(404).send('Product not found.');
        }
    } catch (error) {
        res.status(500).send('Error retrieving product.');
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const productData = req.body;
        const product = await productService.updateProduct(req.params.id, productData);
        if (product) {
            res.status(200).send(product);
        } else {
            res.status(404).send('Product not found.');
        }
    } catch (error) {
        res.status(500).send('Error updating product.');
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await productService.deleteProduct(req.params.id);
        if (product) {
            res.status(200).send('Product deleted successfully.');
        } else {
            res.status(404).send('Product not found.');
        }
    } catch (error) {
        res.status(500).send('Error deleting product.');
    }
};