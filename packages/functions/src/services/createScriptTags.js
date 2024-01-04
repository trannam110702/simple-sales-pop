import shopifyConfig from '@functions/config/shopify';

const createScriptTags = async shopify => {
  const src = `https://${shopifyConfig.baseUrl}/scripttag/avada-sale-pop.min.js`;
  await deleteExistingScriptTags(shopify, src);
  return shopify.scriptTag.create({
    event: 'onload',
    src
  });
};

const deleteExistingScriptTags = async (shopify, src) => {
  const scriptTags = await shopify.scriptTag.list({
    src
  });
  if (scriptTags.length)
    await Promise.all(
      scriptTags.map(async scriptTag => {
        return shopify.scriptTag.delete(scriptTag.id);
      })
    );
};

export default createScriptTags;
