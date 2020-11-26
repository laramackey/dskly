import * as Koa from 'koa';
import * as bodyParser from 'koa-body-parser';
const app = new Koa();
import * as Router from '@koa/router';
const router = new Router();

router.get('/bookings', (ctx) => {
  ctx.body = {
    bookings: [],
  };
  ctx.status = 200;
});

export default () => {
  app.use(bodyParser());
  app.use(async (ctx, next) => {
    return await next();
  });
  app.use(router.routes()).use(router.allowedMethods());
  return app;
};
