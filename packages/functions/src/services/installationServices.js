import {getShopByShopifyDomain} from '@avada/shopify-auth';
import initShopify from './initShopify';
import createSettings from './createDefaultSettings';
import syncOrdersToNotifiactions from './syncOrdersToNotifications';
import createWebhook from './createWebhook';

export async function afterInstall(ctx) {
  const {shop: shopDomain, accessToken} = ctx.state.shopify;
  const shopify = initShopify(shopDomain, accessToken);

  const [orders, shop] = await Promise.all([
    shopify.order.list({
      limit: 30,
      fields: 'created_at,shipping_address,line_items'
    }),
    getShopByShopifyDomain(shopDomain)
  ]);
  await Promise.all([
    syncOrdersToNotifiactions(shopify, {id: shop.id, shopDomain}, orders),
    createSettings(shop.id),
    createWebhook(shopify)
  ]);
}
