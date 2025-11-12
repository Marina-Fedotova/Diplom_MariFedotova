// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['line'],
    ['html', { open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    apiURL : 'https://apichallenges.herokuapp.com',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'API Tests',
      testMatch: 'api/**/*.spec.js',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://apichallenges.herokuapp.com',
      },
    },
    {
      name: 'UI Tests',
      testMatch: 'ui/**/*.spec.js',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://realworld.qa.guru/',
      },
    },
  ],
});

