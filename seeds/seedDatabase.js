const Product = require('../models/productModel');
const Type = require('../models/typeModel');

const seedDatabase = async () => {
    // Crear tipos de productos de prueba
    const electronicType = await Type.create({ nombre: 'Electrónica' });
    const furnitureType = await Type.create({ nombre: 'Muebles' });

    // Crear productos de prueba
    await Product.create({
        nombre: 'Laptop',
        tipoProductoId: electronicType.id,
        imagenUrl: 'https://m.media-amazon.com/images/I/61+r3+JstZL._AC_UF1000,1000_QL80_.jpg',
        descripcion: 'Una laptop de alta calidad.',
        enOferta: true,
        oferta: 20,
        precio: 1000,
        stock: 50,
        color: 'Negro',
        marca: 'Dell'
    });

    await Product.create({
        nombre: 'Silla de oficina',
        tipoProductoId: furnitureType.id,
        imagenUrl: 'https://www.elcontainer.cl/25068-thickbox_default/silla-de-oficina-ergo-serenity-negra.jpg',
        descripcion: 'Una silla ergonómica para oficina.',
        enOferta: false,
        oferta: 0,
        precio: 150,
        stock: 200,
        color: 'Azul',
        marca: 'ErgoChair'
    });

    // Usuario administrador
    const hashedPassword = bcrypt.hashSync('admin123', 8);

    await User.create({
        nombre: 'Admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin'
    });

    console.log('Datos de prueba insertados correctamente');
};

module.exports = seedDatabase;
