require('dotenv').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const userRoutes = require('./routes/user');
const attendanceRoutes = require('./routes/attendance');
const sequelize = require('./db');
const healthzRoutes = require('./routes/healthz');

const app = new Koa();

app.use(cors()); 

app.use(bodyParser());

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = { message: err.message };
        ctx.app.emit('error', err, ctx); 
    }
});

app.use(userRoutes.routes()).use(userRoutes.allowedMethods());
app.use(attendanceRoutes.routes()).use(attendanceRoutes.allowedMethods());
app.use(healthzRoutes.routes()).use(healthzRoutes.allowedMethods());

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected...');

        await sequelize.sync();
        console.log('Database tables synchronized...');

        const port = process.env.PORT || 7100;
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
};

startServer();