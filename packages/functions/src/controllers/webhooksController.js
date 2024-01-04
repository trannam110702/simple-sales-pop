import initShopify from '../services/initShopify';
import {createNotificationsFromOrders} from '../services/syncOrdersToNotifications';
import {getShopByShopifyDomain} from '@avada/shopify-auth';

export const createNotification = async ctx => {
  try {
    const domainName = ctx.get('X-Shopify-Shop-Domain');
    const shop = await getShopByShopifyDomain(domainName);
    const shopify = initShopify(shop.domain, shop.accessToken);
    const order = await shopify.graphql(`query  {
    order(id: "${ctx.req.body.admin_graphql_api_id}") {
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
    }`);
    await createNotificationsFromOrders([order], {...shop, shopDomain: domainName});
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
