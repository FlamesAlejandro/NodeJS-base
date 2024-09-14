const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
require('dotenv').config()

const register = async (nombre, email, password) => {
    const hashPassword = bcrypt.hashSync(password, 8)
    return User.create({ nombre, email, password: hashPassword })
}

const login = async (email, password) => {
    const user = await User.findOne({ where: { email } })

    if (!user) return null

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return null

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: 86400 // 24 hours
    })

    return { auth: true, token: token };
}

module.exports = {
    register,
    login
}