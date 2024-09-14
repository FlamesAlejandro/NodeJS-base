const Invoice = require('../models/invoiceModel');
const InvoiceProduct = require('../models/invoiceProductModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');

exports.createInvoice = async (req, res) => {
    const { usuarioId, productos } = req.body;  // Array de productos con cantidades

    try {
        let total = 0;

        // Verificar productos y calcular el total
        for (let prod of productos) {
            const product = await Product.findByPk(prod.productId);

            if (!product) {
                return res.status(404).json({ message: `Producto con ID ${prod.productId} no encontrado` });
            }

            // Verificar stock
            if (product.stock < prod.cantidad) {
                return res.status(400).json({ message: `No hay suficiente stock de ${product.nombre}` });
            }

            // Calcular el precio final (aplicar descuento si está en oferta)
            const descuento = product.enOferta ? product.oferta : 0;
            const precioFinal = product.precio - (product.precio * descuento / 100);
            const subtotal = precioFinal * prod.cantidad;

            total += subtotal;

            // Reducir el stock del producto
            await Product.update({ stock: product.stock - prod.cantidad }, { where: { id: product.id } });
        }

        // Crear la factura (Invoice)
        const invoice = await Invoice.create({
            usuarioId,
            total
        });

        // Asociar productos con la factura en la tabla InvoiceProduct
        for (let prod of productos) {
            const product = await Product.findByPk(prod.productId);
            const descuento = product.enOferta ? product.oferta : 0;
            const precioFinal = product.precio - (product.precio * descuento / 100);

            await InvoiceProduct.create({
                InvoiceId: invoice.id,
                ProductId: product.id,
                cantidad: prod.cantidad,
                precioUnitario: product.precio,
                descuento,
                precioFinal
            });
        }

        res.status(201).json({ message: 'Factura creada correctamente', invoice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la factura' });
    }
};

exports.getInvoiceDetails = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar la factura por ID
        const invoice = await Invoice.findByPk(id, {
            include: {
                model: Product,
                through: {
                    model: InvoiceProduct,
                    attributes: ['cantidad', 'precioUnitario', 'descuento', 'precioFinal']  // Solo incluir los campos relevantes de InvoiceProduct
                }
            }
        });

        if (!invoice) {
            return res.status(404).json({ message: 'Factura no encontrada' });
        }

        res.status(200).json(invoice);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la factura' });
    }
};
