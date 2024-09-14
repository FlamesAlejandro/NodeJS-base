const authService = require('../services/authService')

exports.register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body
        await authService.register(nombre, email, password)
        res.status(200).send({ message: 'User registered successfully.' })
    } catch (error) {
        res.status(500).send('Error registering the user.');
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const result = await authService.login(email, password)

        if (!result) return res.status(401).send({ auth: false, token: null })

        res.status(200).send(result)
    } catch (error) {
        res.status(500).send('Error on the server.')
    }
}