const attendanceService = require('../services/attendance');

const getMe = async (ctx) => {
    const userId = ctx.state.user.id;
    const location = ctx.request.query.location;
    const timezone = ctx.request.query.timezone

    try {
        const attendance = await attendanceService.getMe(userId, location, timezone);
        ctx.body = attendance;
    } catch (error) {
        ctx.status = 404;
        ctx.body = { error: error.message };
    }
};

const clockIn = async (ctx) => {
    const userId = ctx.state.user.id;
    const photo = ctx.file;
    const ip = ctx.request.body.ip || ctx.request.ip;
    const location = ctx.request.body.location;
    const timezone = ctx.request.body.timezone;

    try {
        await attendanceService.clockIn(userId, photo, location, ip, timezone);
        ctx.status = 204;
    } catch (error) {
        ctx.status = 400;
        ctx.body = { error: error.message };
    }
};

const clockOut = async (ctx) => {
    const userId = ctx.state.user.id;
    const photo = ctx.file;
    const ip = ctx.request.body.ip || ctx.request.ip;
    const location = ctx.request.body.location;
    const timezone = ctx.request.body.timezone;

    try {
        await attendanceService.clockOut(userId, photo, location, ip, timezone);
        ctx.status = 204;
    } catch (error) {
        ctx.status = 400;
        ctx.body = { error: error.message };
    }
};

const getAll = async (ctx) => {
    try {
        const records = await attendanceService.getAll();
        ctx.body = records;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
};

const getById = async (ctx) => {
    const { id } = ctx.params;
    try {
        const record = await attendanceService.getById(id);
        ctx.body = record;
    } catch (error) {
        ctx.status = 404;
        ctx.body = { error: error.message };
    }
};

module.exports = {
    getMe,
    clockIn,
    clockOut,
    getAll,
    getById,
};
