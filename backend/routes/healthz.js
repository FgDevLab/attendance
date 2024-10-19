const Router = require('koa-router');
const router = new Router();

router.get('/healthz', async (ctx) => {
  try {
    ctx.status = 200;
    ctx.body = { status: 'UP', message: 'Service is running' };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { status: 'DOWN', message: 'Service is not available' };
  }
});

module.exports = router;
