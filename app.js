const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const typeRoutes = require('./routes/typeRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
require('dotenv').config();

// Inicializar la aplicación de Express
const app = express();

// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/types', typeRoutes);
app.use('/invoices', invoiceRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;

// Sincronizar los modelos con la base de datos y arrancar el servidor
sequelize.sync({ force: true }).then(() => {
    console.log('Database & tables created!');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
