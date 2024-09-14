const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./productModel');
const Invoice = require('./invoiceModel');

const InvoiceProduct = sequelize.define('InvoiceProduct', {
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precioUnitario: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    descuento: {
        type: DataTypes.INTEGER, // Porcentaje de descuento
        defaultValue: 0,
        allowNull: false
    },
    precioFinal: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

Invoice.belongsToMany(Product, { through: InvoiceProduct });
Product.belongsToMany(Invoice, { through: InvoiceProduct });

module.exports = InvoiceProduct;
