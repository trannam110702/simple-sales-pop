const subcribeWebhook = async shopify =>
  await shopify.webhook.create({
    address: 'https://33b7-171-224-177-204.ngrok-free.app/webhooks/newOrder',
    topic: 'orders/create',
    format: 'json'
  });
export default subcribeWebhook;
