import Router from 'koa-router';
import * as notificationsController from '@functions/controllers/notificationsController';
import * as settingsController from '@functions/controllers/settingsController';
import * as shopController from '@functions/controllers/shopController';
import * as subscriptionController from '@functions/controllers/subscriptionController';
import * as appNewsController from '@functions/controllers/appNewsController';
import {getApiPrefix} from '@functions/const/app';

export default function apiRouter(isEmbed = false) {
  const router = new Router({prefix: getApiPrefix(isEmbed)});

  router.get('/shops', shopController.getUserShops);
  router.get('/subscription', subscriptionController.getSubscription);
  router.get('/appNews', appNewsController.getList);

  router.get('/notifications', notificationsController.getNotifications);
  router.delete('/notifications', notificationsController.deleteNotifications);
  router.get('/settings', settingsController.getSettings);
  router.put('/settings', settingsController.updateSettings);

  return router;
}
