const userService = require('../services/user');

const login = async (ctx) => {
    const { email, password } = ctx.request.body;

    try {
        const { token, user } = await userService.login(email, password);
        ctx.body = { token, user };
    } catch (error) {
        ctx.status = 401;
        ctx.body = { message: error.message };
    }
};

const getMe = async (ctx) => {
    const userId = ctx.state.user.id;
    try {
        const user = await userService.getMe(userId);
        ctx.body = user;
    } catch (error) {
        ctx.status = 404; 
        ctx.body = { message: error.message };
    }
};

const update = async (ctx) => {
    const userId = ctx.state.user.id; 
    const updatedData = ctx.request.body;

    try {
        await userService.update(userId, updatedData);
        ctx.status = 204
    } catch (error) {
        ctx.status = 404; 
        ctx.body = { message: error.message };
    }
};

module.exports = {
    login,
    getMe,
    update,
};
