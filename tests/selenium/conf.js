const JUnitXmlReporter = require('jasmine-reporters').JUnitXmlReporter;
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

const config = {
  framework: 'jasmine2',

  onPrepare() {
    jasmine.getEnv().addReporter(new JUnitXmlReporter({
      savePath: 'build2/reports/junit',
      filePrefix: 'results',
    }));
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));
  },

  jasmineNodeOpts: {
    print: () => {},
    defaultTimeoutInterval: 2 * 60 * 1000 // 2 minutes
  },

  specs: ['spec/*.js'],
  capabilities: {},
  troubleshoot: true
};

// Run Chrome Headless for pull requests
if (process.env.CHROME_HEADLESS) {
  console.log('-- Using Chrome Headless --');
  config.capabilities = {
    'browserName': 'chrome',
    chromeOptions: {
      args: ['--headless','--disable-gpu','--window-size=1600x1200']
    }
  }
}
  
// Run SauceLabs on master branch and internal topic branches
else if (process.env.TRAVIS) {
  console.log('-- Using SauceLabs --');
  config.sauceUser = process.env.SAUCE_USERNAME;
  config.sauceKey = process.env.SAUCE_ACCESS_KEY;
  config.capabilities = {
    'browserName': process.env.SAUCE_BROWSER_NAME,
    'version': process.env.SAUCE_BROWSER_VERSION,
    'platform': process.env.SAUCE_PLATFORM,
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'build': process.env.TRAVIS_BUILD_NUMBER,
    'screenResolution': '1600x1200'
  };
}

// Run Chrome locally and in Bacon
else {
  console.log('-- Using Chrome --');
  config.capabilities.browserName = 'chrome';
}

exports.config = config;
