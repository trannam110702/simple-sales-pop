import {createSettings, deleteSettings} from '../repositories/settingsRepository';
import defaultSettings from '../const/defaultSettings';

/**
 * Creates default settings for a shop.
 * @param {string} shopId - The ID of the shop.
 * @returns {Promise} - A promise that resolves with the created settings.
 */
export default async function createDefaultSettings(shopId) {
  await deleteSettings(shopId);
  await createSettings({...defaultSettings, shopId});
}
