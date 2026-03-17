/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

const { defineConfig, devices } = require("@playwright/test");
const { worker } = require("node:cluster");
/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: "./tests",
  worker: 1,
  timeout: 40 * 1000,
  expect: {
    timeout: 40 * 1000,
  },
  retries: 1,

  reporter: "html",
  projects: [
    {
      name: "chrome",

      use: {
        browserName: "chromium",
        headless: false,
        screenshot: "on",
        video: "retain-on-failure",
        ignoreHttpsErrors: true,
        permission: ["geolocation"],
        trace: "on",
        ...devices["iphone 11"],

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
      },
    },
    {
      name: "electron",

      use: {
        browserName: "chromium",
        headless: false,
        screenshot: "on",
        trace: "on",

        viewport: { width: 720, height: 720 },

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
      },
    },
  ],
};

module.exports = config;
