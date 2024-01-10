import {Firestore} from '@google-cloud/firestore';
import prepareDocs from '../helpers/utils/prepareDocs';

const firestore = new Firestore();
const notifiactionsCollection = firestore.collection('notifications');

/**
 * Retrieves notifications by shop ID.
 * @param {string} shopId - The ID of the shop.
 * @param {object} reqQuery - The request query parameters.
 * @param {string} reqQuery.sort - The sorting order for the notifications.
 * @param {number} reqQuery.limit - The maximum number of notifications to retrieve.
 * @returns {Array<object>} - An array of notifications.
 */
export async function getByShopId(shopId, reqQuery) {
  let query = notifiactionsCollection.where('shopId', '==', shopId);
  const offset = (reqQuery?.page - 1) * reqQuery?.limit;
  const notifcationCount = (await query.count().get()).data().count;

  query = query.orderBy('timestamp', reqQuery.sort ? reqQuery.sort : 'desc');
  query = query.offset(offset);
  query = query.limit(Number(reqQuery.limit ? reqQuery.limit : 30));

  const querySnapshot = await query.get();
  return {
    notifications: querySnapshot.docs.map(prepareDocs),
    hasNext: reqQuery?.limit * reqQuery?.page <= notifcationCount,
    hasPre: offset > 0
  };
}

/**
 * Retrieves notifications by shop domain.
 * @param {string} shopDomain - The domain of the shop.
 * @param {object} reqQuery - The request query parameters.
 * @param {string} reqQuery.sort - The sorting order for the notifications.
 * @param {number} reqQuery.limit - The maximum number of notifications to retrieve.
 * @returns {Array<object>} - An array of notifications.
 */
export async function getByShopDomain(shopDomain, reqQuery) {
  let query = notifiactionsCollection;

  query = query.where('shopDomain', '==', shopDomain);
  query = query.orderBy('timestamp', reqQuery.sort ? reqQuery.sort : 'desc');
  query = query.limit(Number(reqQuery.limit ? reqQuery.limit : 30));

  const querySnapshot = await query.get();
  return querySnapshot.docs.map(prepareDocs);
}

/**
 * Creates notifications for a specific shop by shopId.
 * @param {string} shopId - The ID of the shop.
 * @param {Object|Object[]} data - The notification data or an array of notification data.
 * @returns {Promise<void>} - A promise that resolves when the notifications are created.
 */
export async function createByShopId(shopId, data) {
  if (typeof data === 'object' && !Array.isArray(data)) {
    data = [data];
  }
  const batch = firestore.batch();
  data.forEach(notification => {
    const docRef = notifiactionsCollection.doc();
    batch.set(docRef, {...notification, shopId});
  });
  await batch.commit();
}

/**
 * Deletes notifications by their IDs.
 * @param {string[]} ids - An array of notification IDs to delete.
 * @returns {Promise<void>} - A promise that resolves when the notifications are deleted.
 */
export async function deleteByIds(ids) {
  const batch = firestore.batch();
  ids.forEach(id => {
    const docRef = notifiactionsCollection.doc(id);
    batch.delete(docRef);
  });
  await batch.commit();
}
