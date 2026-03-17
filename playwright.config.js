
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

// const { retries } = require("./playwright.config1");

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries :1,

  timeout:40*1000,
  expect:{
    timeout:40*1000
  },

   reporter: [["line"], ["allure-playwright"]],
    
 


  use: {
    browserName:'chromium',
    headless:true,
    screenshot:'on',
    trace:"on"

    
   
    /* Collect trace when retrying the failed test.6 See https://playwright.dev/docs/trace-viewer */

  },



});

module.exports = config