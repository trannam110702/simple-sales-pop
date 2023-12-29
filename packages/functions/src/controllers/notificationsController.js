import {
  getByShopId as getNotificationsByShopId,
  deleteByIds as deleteNotificationsByIds
} from '../repositories/notificationsRepository';
import {getCurrentShop} from '../helpers/auth';

/**
 * Retrieves notifications for a specific shop.
 * @param {Object} ctx - The Koa context object.
 * @returns {Promise<void>} - A promise that resolves when the notifications are retrieved.
 */
export const getNotifications = async ctx => {
  try {
    ctx.body = {
      data: await getNotificationsByShopId(getCurrentShop(ctx), ctx.req.query),
      success: true
    };
    ctx.status = 200;
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message
    };
  }
};

/**
 * Deletes notifications by their IDs.
 *
 * @param {Object} ctx - The Koa context object.
 * @returns {Promise<void>} - A promise that resolves when the notifications are deleted.
 * @throws {Error} - If there is an error while deleting the notifications.
 */
export const deleteNotifications = async ctx => {
  try {
    await deleteNotificationsByIds(ctx.req.body.data.ids);
    ctx.body = {
      success: true
    };
    ctx.status = 200;
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message
    };
  }
};
