const jwt = require('jsonwebtoken');
const { secret_key } = require('../config/jwt');

const authMiddleware = async (ctx, next) => {
    console.log(ctx)
    const token = ctx.headers['authorization']

    if (!token) {
        ctx.status = 401; 
        ctx.body = { message: 'No token provided. Access denied.' };
        return;
    }

    try {
        const decoded = jwt.verify(token, secret_key);
        ctx.state.user = { id: decoded.id, role: decoded.role };
        await next();
    } catch (error) {
        ctx.status = 401; 
        ctx.body = { message: 'Invalid token. Access denied.' };
    }
};

module.exports = authMiddleware;
