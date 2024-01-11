import {createByShopId as createNotifications} from '../repositories/notificationsRepository';

const syncOrdersToNotifications = async (shopify, shopInfo) => {
  const {orders} = await shopify.graphql(`query {
  orders(first: 30) {
    edges {
      order: node {
        createdAt
        shippingAddress {
          city
          country
          firstName
        }
        lineItems(first: 1) {
          edges {
            node {
              product {
               id
                title
                images(first: 1) {
                  edges {
                    node {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`);
  return createNotificationsFromOrders(orders.edges, shopInfo);
};

export const createNotificationsFromOrders = async (orders, shopInfo) => {
  const notifications = orders.map(item => lineItemToNotification(shopInfo, item.order));
  return createNotifications(shopInfo.id, notifications);
};

const lineItemToNotification = (shopInfo, order) => {
  return {
    city: order.shippingAddress.city,
    country: order.shippingAddress.country,
    firstName: order.shippingAddress.firstName,
    productId: order.lineItems.edges[0].node.product.id,
    productImage: order.lineItems.edges[0].node.product.images.edges[0].node.url,
    productName: order.lineItems.edges[0].node.product.title,
    shopDomain: shopInfo.shopDomain,
    shopId: shopInfo.id,
    timestamp: new Date(order.createdAt)
  };
};

export default syncOrdersToNotifications;
