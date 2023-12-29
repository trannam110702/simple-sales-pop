import {createSettings} from '../repositories/settingsRepository';
import defaultSettings from '../const/defaultSettings';

export default async function createDefaultSettings(shopId) {
  await createSettings(defaultSettings(shopId));
}
