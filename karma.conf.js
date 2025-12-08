// Karma configuration for visible Chrome browser
module.exports = function(config) {
  config.set({
    // Use Chrome instead of ChromeHeadless
    browsers: ['Chrome'],
    
    // Keep browser open for debugging
    singleRun: false,
    
    // Custom launcher for Chrome (not headless)
    customLaunchers: {
      ChromeDebug: {
        base: 'Chrome',
        flags: [
          '--disable-web-security',
          '--disable-gpu',
          '--no-sandbox'
        ]
      }
    }
  });
};
