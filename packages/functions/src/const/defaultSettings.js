const defaultSettings = shopId => {
  return {
    position: 'bottom-left',
    hideTimeAgo: false,
    truncateProductName: false,
    displayDuration: 20,
    firstDelay: 30,
    popsInterval: 20,
    maxPopsDisplay: 10,
    includedUrls: '',
    excludedUrls: '',
    allowShow: 'all',
    shopId
  };
};
export default defaultSettings;
