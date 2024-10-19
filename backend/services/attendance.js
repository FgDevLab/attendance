const { Op } = require('sequelize');
const { User, Attendance } = require('../models');
const AwsConfig = require("../config/aws");
const AwsSdk = require("aws-sdk");
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone');

const s3 = new AwsSdk.S3({
    accessKeyId: AwsConfig.AWS_ACCESS_KEY_ID,
    secretAccessKey: AwsConfig.AWS_SECRET_ACCESS_KEY,
    region: AwsConfig.AWS_REGION,
});

const uploadToS3 = async (file) => {
    const params = {
        Bucket: AwsConfig.AWS_S3_BUCKET_NAME,
        Key: `${uuidv4()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
    };

    const data = await s3.upload(params).promise();
    return data.Location;
};

const getStartOfToday = (timezone) => {
    return moment().tz(timezone || 'UTC').startOf('day').format("YYYY-MM-DD HH:mm:ss");
};

const checkExistingRecord = async (userId, type, userTimeZone) => {
    return await Attendance.findOne({
        where: {
            userId,
            createdAt: {
                [Op.gte]: getStartOfToday(userTimeZone),
            },
            type,
        },
    });
};

const getMe = async (userId, timezone) => {
    const attendanceRecords = await Attendance.findAll({
        where: {
            userId,
            createdAt: {
                [Op.gte]: getStartOfToday(timezone),
            },
        },
        order: [['createdAt', 'DESC']],
    });


    if (attendanceRecords.length === 0) {
        throw new Error('No attendance record found for today.');
    }

    return attendanceRecords;
};

const clockIn = async (userId, photo, location, ip, timezone) => {
    const existingInRecord = await checkExistingRecord(userId, 'in', timezone);

    if (existingInRecord) {
        throw new Error('You have already clocked in today.');
    }

    const photoUrl = await uploadToS3(photo);

    return await Attendance.create({
        userId,
        type: 'in',
        location,
        ip,
        photo: photoUrl,
        createdAt: moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss"),
    });
};

const clockOut = async (userId, photo, location, ip, timezone) => {
    const existingInRecord = await checkExistingRecord(userId, 'in', timezone);
    const existingOutRecord = await checkExistingRecord(userId, 'out', timezone);

    if (!existingInRecord) {
        throw new Error('You need to clock in before clocking out.');
    }

    if (existingOutRecord) {
        throw new Error('You have already clocked out today.');
    }

    const photoUrl = await uploadToS3(photo);

    return await Attendance.create({
        userId,
        type: 'out',
        location,
        ip,
        photo: photoUrl,
        createdAt: moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss"),
    });
};

const getAll = async () => {
    try {
        const records = await Attendance.findAll({
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'email'],
            }],
        });

        if (!records.length) {
            throw new Error('No attendance records found.');
        }

        return records;
    } catch (error) {
        console.error('Error fetching all attendance records:', error.message);
        throw new Error(error.message);
    }
};

const getById = async (attendanceId) => {
    const record = await Attendance.findByPk(attendanceId, {
        include: [{
            model: User,
            as: 'user',
        }],
    });

    if (!record) {
        throw new Error('Attendance record not found.');
    }

    return record;
};

module.exports = {
    getMe,
    clockIn,
    clockOut,
    getAll,
    getById,
};
