const createWebhook = async shopify => {
  const webhooks = await shopify.webhook.list({topic: 'orders/create'});
  if (webhooks.length)
    await Promise.all(
      webhooks.map(async webhook => {
        return shopify.webhook.delete(webhook.id);
      })
    );

  return await shopify.webhook.create({
    address: 'https://33b7-171-224-177-204.ngrok-free.app/webhooks/newOrder',
    topic: 'orders/create',
    format: 'json'
  });
};
export default createWebhook;
