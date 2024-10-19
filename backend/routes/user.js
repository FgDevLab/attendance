const Router = require('koa-router');
const userController = require('../controllers/user');
const authMiddleware = require('../middleware/auth');

const router = new Router();

router.post('/user/login', userController.login);

router.get('/user/me', authMiddleware, userController.getMe);

router.put('/user', authMiddleware, userController.update);

module.exports = router;
