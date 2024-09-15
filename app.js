const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoute');
const productRoutes = require('./routes/productRoute');
const typeRoutes = require('./routes/typeRoute');
const invoiceRoutes = require('./routes/invoiceRoute');
const userRoutes = require('./routes/userRoute')
const seedDatabase = require('./seeds/seedDatabase')
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
// Crear la bdd y las tablas
// el { force: true } borra y los crea cada vez que se ejecuta! quitar en prod
// para modificar tablas y no borrarlas ({ alter: true })
sequelize.sync({ force: true }).then(async () => {
    console.log('Database & tables created!');

    // Insertar los datos de prueba
    await seedDatabase();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
