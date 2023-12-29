const createWebhook = async shopify => {
  await deleteExistingWebhooks(shopify);
  return await shopify.webhook.create({
    address: 'https://b798-42-116-253-172.ngrok-free.app/webhooks/newOrder',
    topic: 'orders/create',
    format: 'json'
  });
};

const deleteExistingWebhooks = async shopify => {
  const webhooks = await shopify.webhook.list({
    topic: 'orders/create'
  });
  if (webhooks.length)
    await Promise.all(
      webhooks.map(async webhook => {
        return shopify.webhook.delete(webhook.id);
      })
    );
};
export default createWebhook;
