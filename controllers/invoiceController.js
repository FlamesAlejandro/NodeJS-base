const invoiceService = require('../services/invoiceService');

exports.createInvoice = async (req, res) => {
    const { usuarioId, productos } = req.body;

    try {
        const invoice = await invoiceService.createInvoice(usuarioId, productos);
        res.status(201).json({ message: 'Factura creada correctamente', invoice });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

exports.getInvoiceDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const invoice = await invoiceService.getInvoiceDetails(id);
        res.status(200).json(invoice);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: error.message });
    }
};
