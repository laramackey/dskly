import * as Koa from 'koa';
import * as bodyParser from 'koa-body-parser';
const app = new Koa();
import * as Router from '@koa/router';
const router = new Router();
import {addDb} from './db';
import getHandler from './get-bookings';

router.get('/bookings', getHandler);

export default () => {
  app.use(bodyParser());
  app.use(async (ctx, next) => {
    return await next();
  });
  app.use(addDb());
  app.use(router.routes()).use(router.allowedMethods());
  return app;
};
