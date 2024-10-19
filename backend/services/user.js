const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const JWT = require('../config/jwt');

const login = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
        { id: user.id, role: user.role },
        JWT.secret_key,
        { expiresIn: '1d' }
    );

    return { token, user: { role : user.role } };
};

const getMe = async (userId) => {
    const user = await User.findByPk(userId, {
        attributes: ['id', 'bio', 'name', 'email', 'role', 'createdAt', 'updatedAt']
    });

    if (!user) {
        throw new Error('User not found');
    }

    return user;
};

const update = async (userId, updatedData) => {
    const user = await User.findByPk(userId);

    if (!user) {
        throw new Error('User not found');
    }

    const { name, bio } = updatedData;
    if (name !== undefined) {
        user.name = name;
    }
    if (bio !== undefined) {
        user.bio = bio;
    }

    await user.save();
    return null;
};

module.exports = {
    login,
    getMe,
    update,
};
