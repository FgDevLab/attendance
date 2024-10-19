const Router = require('koa-router');
const attendanceController = require('../controllers/attendance');
const authMiddleware = require('../middleware/auth');
const multer = require('@koa/multer');

const upload = multer(); 

const router = new Router();

router.get('/attendance/me', authMiddleware, attendanceController.getMe);

router.post('/attendance/clockin', authMiddleware, upload.single('photo'), attendanceController.clockIn);

router.post('/attendance/clockout', authMiddleware, upload.single('photo'), attendanceController.clockOut);

router.get('/attendance', authMiddleware, attendanceController.getAll);

router.get('/attendance/:id', authMiddleware, attendanceController.getById);

module.exports = router;
