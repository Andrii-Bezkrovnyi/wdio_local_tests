export const config = {
  runner: 'local',

  // Instruct WebdriverIO to connect directly to the driver's local port
  hostname: 'localhost',
  port: 9515,
  path: '/',

  specs: ['./test/specs/**/*.spec.js'],
  exclude: [],
  maxInstances: 10,
  baseUrl: 'https://www.saucedemo.com',
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 10000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 600000,
  },
  globals: true,
  injectGlobals: true,

  capabilities: [
    {
      maxInstances: 10,
      browserName: 'chrome',
      'goog:chromeOptions': {
        // Turn off the password manager and safe browsing features to prevent pop-ups during tests
        prefs: {
          credentials_enable_service: false,
          'profile.password_manager_enabled': false,
          'profile.password_manager_leak_detection': false,
          'safebrowsing.enabled': false,
        },
        args: [
          // '--headless=new', // Run Chrome in headless mode for faster execution and to avoid UI issues in CI environments
          '--no-sandbox', // Required for running Chrome in Docker containers
          '--disable-dev-shm-usage', // Overcome limited resource problems
          '--start-maximized', // Start the browser maximized to ensure all elements are visible
          // Turn off features that may cause pop-ups or interfere with tests
          '--disable-features=PasswordLeakDetection',
          '--disable-popup-blocking',
        ],
      },
    },
  ],
};
