'use strict';

const BasePage = require('./BasePage');
const util = require('../shared/util');

class CodePage extends BasePage {
  constructor(url) {
    super(url);
    this.$pageLoad = $('.Row');
    this.$quickStart = element(by.cssContainingText('span', 'Authentication Quick Start Guide'));
    this.$sampleApp = element(by.cssContainingText('span', 'Sample App'));
    this.setPageLoad(this.$pageLoad);
  }

  hasQuickStart() {
    return this.$quickStart.isPresent();
  }

  hasSampleApp() {
    return this.$sampleApp.isPresent();
  }
}
module.exports = CodePage;
