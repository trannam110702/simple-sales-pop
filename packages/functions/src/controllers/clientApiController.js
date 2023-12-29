import {getByShopDomain as getNotifitcationsByShopDomain} from '../repositories/notificationsRepository';
import {getByShopDomain as getSettingsByShopDomain} from '../repositories/settingsRepository';

export const getNotifications = async ctx => {
  try {
    ctx.body = {
      data: await getNotifitcationsByShopDomain(ctx.query.shopifyDomain, ctx.query),
      settings: await getSettingsByShopDomain(ctx.query.shopifyDomain)
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
