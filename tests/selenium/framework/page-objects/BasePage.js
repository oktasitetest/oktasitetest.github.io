'use strict';

const util = require('../shared/util');
const EC = protractor.ExpectedConditions;
const baseUrl = 'http://localhost:4000';

class BasePage {
  constructor(relativeURL) {
    this.$pageLoad = null;
    if(relativeURL) {
      this.url = baseUrl + relativeURL;
    } else {
      this.url = baseUrl;
    }
  }

  setPageLoad(element) {
    this.$pageLoad = element;
  }

  load() {
    browser.ignoreSynchronization = true;
    browser.get(this.url);
    return this.waitForPageLoad();
  }

  waitForPageLoad() {
    return util.wait(this.$pageLoad);
  }

  waitForPresence(elem) {
    return util.wait(elem);
  }

  setWindowSize(width, height) {
    browser.driver.manage().window().setSize(width, height);
  }

  waitUntilOnScreen(elementFinder) {
    browser.wait(util.isOnScreen(elementFinder));
  }

  waitUntilOffScreen(elementFinder) {
    browser.wait(EC.not(util.isOnScreen(elementFinder)));
  }

  elementsContainText(elements, expectedTextArray) {
    if (!Array.isArray(expectedTextArray)) {
      expectedTextArray = [expectedTextArray];
    }
    return elements.filter((element, index) => {
      return element.getText().then((text) => {
        return expectedTextArray.indexOf(text) > -1;
      });
    }).then((elementList) => {
      return elementList.length == expectedTextArray.length;
    });
  }

  urlContains(str) {
    return EC.urlContains(str)();
  }

  getCurrentURL() {
    return browser.getCurrentUrl().then(url => url.replace(baseUrl, ''));
  }

  // These are values used in css for managing different browser sizes -
  // 'xx-small': 480px,
  // 'x-small': 600px,
  // 'small': 768px,
  // 'medium': 1024px,
  // 'large': 1200px,
  // 'x-large': 1400px,
  // 'xx-large': 1600px
  // setSize() calls fail on headless chrome due to chromedriver issue
  resizeMedium() {
    if (!process.env.CHROME_HEADLESS) {
      browser.driver.manage().window().setSize(1024, 640);
    }
  }

  resizeXXsmall() {
    if (!process.env.CHROME_HEADLESS) {
      browser.driver.manage().window().setSize(480, 640);
    }
  }

  resizeXLarge() {
    if (!process.env.CHROME_HEADLESS) {
      browser.driver.manage().window().setSize(1400, 840);
    }
  }

  hasElements(elements) {
    return elements.then(element => element.length > 0);
  }

  refresh() {
    return browser.refresh();
  }
}
module.exports = BasePage;