
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',

  timeout:40*1000,
  expect:{
    timeout:40*1000
  },

  reporter:'html',
 


  use: {
    browserName:'chromium',
    headless:false,
    screenshot:'on',
    trace:"on"

    
   
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

  },



});

module.exports = config