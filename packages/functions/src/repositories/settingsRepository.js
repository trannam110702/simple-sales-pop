import {Firestore} from '@google-cloud/firestore';
import prepareDocs from '../helpers/utils/prepareDocs';
import {getShopByShopifyDomain} from '@avada/shopify-auth';

const firestore = new Firestore();
const settingsCollection = firestore.collection('settings');

/**
 * Retrieves the settings document by shop ID.
 *
 * @param {string} shopId - The ID of the shop.
 * @returns {Promise<Object>} - The settings document.
 */
export async function getByShopId(shopId) {
  const querySnapshot = await settingsCollection.where('shopId', '==', shopId).get();
  return querySnapshot.docs.map(prepareDocs)[0];
}

/**
 * Retrieves the settings document by shop domain.
 * @param {string} shopDomain - The domain of the shop.
 * @returns {Promise<Object>} - The settings document.
 */
export async function getByShopDomain(shopDomain) {
  const shop = await getShopByShopifyDomain(shopDomain);
  const querySnapshot = await settingsCollection.where('shopId', '==', shop.id).get();
  return querySnapshot.docs.map(prepareDocs)[0];
}

/**
 * Updates the settings document in the Firestore collection based on the shopId.
 *
 * @param {string} shopId - The ID of the shop.
 * @param {Object} data - The data to update in the document.
 * @returns {Promise<void>} A promise that resolves when the update is complete.
 */
export async function updateByShopId(shopId, data) {
  const querySnapshot = await settingsCollection.where('shopId', '==', shopId).get();
  const doc = querySnapshot.docs[0];
  return doc.ref.update(data);
}

/**
 * Creates a new settings document in the Firestore collection.
 *
 * @param {Object} data - The data to create the document.
 * @returns {Promise<void>} A promise that resolves when the creation is complete.
 */
export async function createSettings(data) {
  return settingsCollection.add(data);
}

/**
 * Deletes settings with the specified shopId.
 * @param {string} shopId - The ID of the shop.
 * @returns {Promise<void>} - A promise that resolves when the deletion is complete.
 */
export async function deleteSettings(shopId) {
  const querySnapshot = await settingsCollection.where('shopId', '==', shopId).get();
  if (querySnapshot.empty) {
    return;
  }
  const batch = firestore.batch();
  querySnapshot.docs.forEach(doc => batch.delete(doc.ref));
  return batch.commit();
}
