const Invoice = require('../models/invoiceModel');
const InvoiceProduct = require('../models/invoiceProductModel');
const Product = require('../models/productModel');

const createInvoice = async (usuarioId, productos) => {
    let total = 0;
    let productDetails = [];

    // Verificar productos y calcular el total
    for (let prod of productos) {
        const product = await Product.findByPk(prod.productId);

        if (!product) {
            throw new Error(`Producto con ID ${prod.productId} no encontrado`);
        }

        // Verificar stock
        if (product.stock < prod.cantidad) {
            throw new Error(`No hay suficiente stock de ${product.nombre}`);
        }

        // Calcular el precio final (aplicar descuento si está en oferta)
        const descuento = product.enOferta ? product.oferta : 0;
        const precioFinal = product.precio - (product.precio * descuento / 100);
        const subtotal = precioFinal * prod.cantidad;

        total += subtotal;

        // Reducir el stock del producto
        await Product.update({ stock: product.stock - prod.cantidad }, { where: { id: product.id } });

        // Guardar los detalles del producto
        productDetails.push({
            productId: product.id,
            cantidad: prod.cantidad,
            precioUnitario: product.precio,
            descuento,
            precioFinal
        });
    }

    // Crear la factura (Invoice)
    const invoice = await Invoice.create({
        usuarioId,
        total
    });

    // Asociar productos con la factura en la tabla InvoiceProduct
    for (let detail of productDetails) {
        await InvoiceProduct.create({
            InvoiceId: invoice.id,
            ProductId: detail.productId,
            cantidad: detail.cantidad,
            precioUnitario: detail.precioUnitario,
            descuento: detail.descuento,
            precioFinal: detail.precioFinal
        });
    }

    return invoice;
};

const getInvoiceDetails = async (id) => {
    const invoice = await Invoice.findByPk(id, {
        include: {
            model: Product,
            through: {
                model: InvoiceProduct,
                attributes: ['cantidad', 'precioUnitario', 'descuento', 'precioFinal']
            }
        }
    });

    if (!invoice) {
        throw new Error('Factura no encontrada');
    }

    return invoice;
};

module.exports = {
    createInvoice,
    getInvoiceDetails
};
