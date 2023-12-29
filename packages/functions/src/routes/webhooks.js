import Router from 'koa-router';
import * as webhooksController from '../controllers/webhooksController';

const router = new Router({prefix: '/webhooks'});
router.post('/newOrder', webhooksController.createNotification);

export default router;
