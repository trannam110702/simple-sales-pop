import Shopify from 'shopify-api-node';

/**
 * Initialize Shopify API
 * @param {string} shopDomain
 * @param {string} accessToken
 * @return {Shopify}
 */
const initShopify = (shopDomain, accessToken) =>
  new Shopify({
    shopName: shopDomain,
    accessToken: accessToken
  });

export default initShopify;
