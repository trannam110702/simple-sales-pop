import initShopify from '../services/initShopify';
import syncOrdersToNotifiactions from '../services/syncOrdersToNotifications';
import {getShopByShopifyDomain} from '@avada/shopify-auth';

export const createNotification = async ctx => {
  try {
    const domainName = ctx.get('X-Shopify-Shop-Domain');
    const shop = await getShopByShopifyDomain(domainName);
    const shopify = initShopify(shop.domain, shop.accessToken);
    await syncOrdersToNotifiactions(shopify, {...shop, shopDomain: domainName}, [ctx.req.body]);
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
