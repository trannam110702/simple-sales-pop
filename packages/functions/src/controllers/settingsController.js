import {
  getByShopId as getSettingsByShopId,
  updateByShopId as updateSettingsByShopId
} from '../repositories/settingsRepository';
import {getCurrentShop} from '../helpers/auth';

/**
 * Retrieves the settings for a specific shop.
 * @param {Object} ctx - The Koa context object.
 * @returns {Promise<void>} - A promise that resolves when the settings are retrieved.
 */
export const getSettings = async ctx => {
  try {
    ctx.body = {
      data: await getSettingsByShopId(getCurrentShop(ctx)),
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
 * Updates the settings for a specific shop.
 * @param {Object} ctx - The Koa context object.
 * @returns {Promise<void>} - A promise that resolves when the settings are updated.
 */
export const updateSettings = async ctx => {
  try {
    await updateSettingsByShopId(getCurrentShop(ctx), ctx.req.body.data);
    ctx.body = {
      data: 'success',
      success: true
    };
    ctx.status = 200;
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      error: e.message
    };
  }
};
