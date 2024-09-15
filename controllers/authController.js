const authService = require('../services/authService');

// Controlador de registro
exports.register = async (req, res) => {
    const { nombre, email, password, role } = req.body;

    try {
        // Llamar al servicio de registro
        const { token, user } = await authService.register(nombre, email, password, role);

        // Enviar la respuesta con el token y los detalles del usuario
        res.status(201).json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

// Controlador de login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Llamar al servicio de login
        const { token, user } = await authService.login(email, password);

        // Enviar la respuesta con el token y los detalles del usuario
        res.status(200).json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};
