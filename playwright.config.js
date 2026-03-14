// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */

const config = {
  testDir: "./tests",
  timeout: 30 * 1000, // timeout for overall test is 30 sec.
  //30 sec is the global timeout.

  expect: {
    timeout: 5000, // time out for all assertio is 5sec
    //5 sec is expect time out.
  },
  reporter: "html",

  use: {
    browserName: "chromium",
    hedless: false,
    screenshot: "on",
    trace: "retain-on-failure", // off,on
  },
};

module.exports = config;
