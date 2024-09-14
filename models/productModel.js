const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Type = require('./typeModel');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipoProductoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Type,
            key: 'id'
        }
    },
    imagenUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    enOferta: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    oferta: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

// Definir la relación entre Product y Type
Type.hasMany(Product, { foreignKey: 'tipoProductoId' });
Product.belongsTo(Type, { foreignKey: 'tipoProductoId' });

module.exports = Product;