import * as Koa from 'koa';
import * as bodyParser from 'koa-body-parser';
const app = new Koa();
import * as Router from '@koa/router';
import * as cors from 'kcors';
const router = new Router();
import {addDb} from './db';
import getHandler from './get-bookings';
import postHandler from './post-bookings';

router.get('/bookings', getHandler);
router.post('/bookings', postHandler);

export default () => {
  app.use(bodyParser());
  app.use(cors({origin: '*'}));
  app.use(async (ctx, next) => {
    return await next();
  });
  app.use(addDb());
  app.use(router.routes()).use(router.allowedMethods());
  return app;
};
