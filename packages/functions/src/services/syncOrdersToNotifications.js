import {createByShopId as createNotifications} from '../repositories/notificationsRepository';

const lineItemToNotification = async (shopify, shopInfo, order) => {
  const productInfo = await shopify.product.get(order.line_items[0].product_id, {
    fields: 'id, title, image'
  });

  return {
    city: order.shipping_address.city,
    country: order.shipping_address.country,
    firstName: order.shipping_address.first_name,
    productId: productInfo.id,
    productImage: productInfo.image.src,
    productName: productInfo.title,
    shopDomain: shopInfo.shopDomain,
    shopId: shopInfo.id,
    timestamp: new Date(order.created_at)
  };
};

/**
 * Syncs orders to notifications.
 *
 * @param {Object} shopify - The Shopify object.
 * @param {Object} shopInfo - The shop information object.
 * @param {Array} orders - The array of orders.
 * @returns {Promise<void>} - A promise that resolves when the synchronization is complete.
 */
const syncOrdersToNotifications = async (shopify, shopInfo) => {
  const orders = await shopify.order.list({
    limit: 30,
    fields: 'created_at,shipping_address,line_items'
  });
  await createNotificationsFromOrders(shopify, shopInfo, orders);
};

export const createNotificationsFromOrders = async (shopify, shopInfo, orders) => {
  const notifications = await Promise.all(
    orders.map(order => lineItemToNotification(shopify, shopInfo, order))
  );
  await createNotifications(shopInfo.id, notifications);
};

export default syncOrdersToNotifications;
