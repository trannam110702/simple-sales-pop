import {createByShopId as createNotifications} from '../repositories/notificationsRepository';

/**
 * Syncs orders to notifications.
 *
 * @param {Object} shopify - The Shopify object.
 * @param {Object} shopInfo - The shop information object.
 * @param {Array} orders - The array of orders.
 * @returns {Promise<void>} - A promise that resolves when the synchronization is complete.
 */
const syncOrdersToNotifiactions = async (shopify, shopInfo, orders) => {
  const notifications = await Promise.all(
    orders
      .map(order => {
        return order.line_items.map(async product => {
          const productInfo = await shopify.product.get(product.product_id, {
            fields: 'id, title, image'
          });
          return {
            city: order.shipping_address.city,
            country: order.shipping_address.country,
            firstname: order.shipping_address.first_name,
            productId: productInfo.id,
            productImage: productInfo.image.src,
            productName: productInfo.title,
            shopDomain: shopInfo.shopDomain,
            shopId: shopInfo.id,
            timestamp: new Date(order.created_at)
          };
        });
      })
      .flat(Infinity)
  );
  await createNotifications(shopInfo.id, notifications);
};
export default syncOrdersToNotifiactions;
