import {insertAfter} from '../helpers/insertHelpers';
import {render} from 'preact';
import React from 'preact/compat';
import NotificationPopup from '../components/NotificationPopup/NotificationPopup';
import delay from '../helpers/utils/delay';

export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = {};
  }

  async initialize({notifications, settings}) {
    this.notifications = notifications.slice(0, settings.maxPopsDisplay);
    this.settings = settings;

    if (this.isShowPopUp(settings)) {
      this.insertContainer(settings.position);
      await delay(settings.firstDelay * 1000);
      notifications.forEach(async (notification, index) => {
        await delay((settings.popsInterval + settings.displayDuration) * index * 1000);
        await this.displayOnePopUp(notification, settings);
      });
    }
  }

  fadeOut() {
    const container = document.querySelector('#Avada-SalePop');
    render(<></>, container);
  }

  display({notification, settings}) {
    const container = document.querySelector('#Avada-SalePop');
    render(
      <NotificationPopup
        {...notification}
        truncateProductName={settings.truncateProductName}
        hideTimeAgo={settings.hideTimeAgo}
        displayDuration={settings.displayDuration}
      />,
      container
    );
  }

  isShowPopUp(settings) {
    const url = window.location.href.replace(/[?#].*$/, '');
    const excludedUrls = settings.excludedUrls.split('\n');
    const includedUrls = settings.includedUrls.split('\n');
    if (excludedUrls.includes(url)) return false;
    if (settings.allowShow === 'all') return true;
    if (settings.allowShow === 'specific' && includedUrls.includes(url)) return true;
  }

  insertContainer(position) {
    const popupEl = document.createElement('div');
    popupEl.id = `Avada-SalePop`;
    popupEl.classList.add('Avada-SalePop__OuterWrapper', position);
    const targetEl = document.querySelector('body').firstChild;
    if (targetEl) {
      insertAfter(popupEl, targetEl);
    }

    return popupEl;
  }

  displayOnePopUp = async (notification, settings) => {
    this.display({notification, settings});
    await delay(settings.displayDuration * 1000);
    this.fadeOut();
    await delay(settings.popsInterval * 1000);
  };
}
