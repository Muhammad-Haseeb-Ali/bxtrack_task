// authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');
const generateToken = require('../utils/generateToken');

const register = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        const user = new User({ username, email, password: bcrypt.hashSync(password, 10), role });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).populate('role');
        if (user && bcrypt.compareSync(password, user.password)) {
            res.json({ token: generateToken(user._id) });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    register,
    login
}