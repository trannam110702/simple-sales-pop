import {getShopByShopifyDomain} from '@avada/shopify-auth';
import initShopify from './initShopify';
import createSettings from './createDefaultSettings';
import syncOrdersToNotifications from './syncOrdersToNotifications';
import createWebhook from './createWebhook';
import createScriptTags from './createScriptTags';

export async function afterInstall(ctx) {
  const {shop: shopDomain, accessToken} = ctx.state.shopify;
  const shopify = initShopify(shopDomain, accessToken);

  const shop = await getShopByShopifyDomain(shopDomain);
  await Promise.all([
    syncOrdersToNotifications(shopify, {id: shop.id, shopDomain}),
    createSettings(shop.id),
    createWebhook(shopify)
    // createScriptTags(shopify)
  ]);
}
