const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Servicio de registro
const register = async (nombre, email, password, role = 'user') => {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
        throw new Error('El correo electrónico ya está registrado');
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario en la base de datos
    const newUser = await User.create({
        nombre,
        email,
        password: hashedPassword,
        role
    });

    // Generar un token JWT para el nuevo usuario
    const token = jwt.sign(
        { id: newUser.id, email: newUser.email, role: newUser.role },
        process.env.SECRET,
        { expiresIn: '1h' }
    );

    // Devolver el token y la información del usuario
    return { token, user: { id: newUser.id, email: newUser.email, role: newUser.role } };
};

// Servicio de login
const login = async (email, password) => {
    // Buscar el usuario por email
    const user = await User.findOne({ where: { email } });

    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    // Comparar la contraseña proporcionada con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Contraseña incorrecta');
    }

    // Generar un token JWT si la autenticación es correcta
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.SECRET,
        { expiresIn: '1h' }
    );

    // Devolver el token y la información del usuario
    return { token, user: { id: user.id, email: user.email, role: user.role } };
};

module.exports = {
    register,
    login
};
