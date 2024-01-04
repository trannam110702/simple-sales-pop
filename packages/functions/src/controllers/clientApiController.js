import {getByShopDomain as getNotifitcationsByShopDomain} from '../repositories/notificationsRepository';
import {getByShopDomain as getSettingsByShopDomain} from '../repositories/settingsRepository';

export const getNotifications = async ctx => {
  try {
    const [notifications, settings] = await Promise.all([
      getNotifitcationsByShopDomain(ctx.query.shopifyDomain, ctx.query),
      getSettingsByShopDomain(ctx.query.shopifyDomain)
    ]);
    ctx.body = {
      notifications,
      settings
    };
    ctx.status = 200;
  } catch (e) {
    console.log(e);
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message
    };
  }
};
