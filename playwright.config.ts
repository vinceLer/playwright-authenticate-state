import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: [['html'], ['list']],
  use: {
    trace: 'retain-on-failure',
  },

  projects: [
    { name: 'setup',
      testMatch: /.*\.setup\.ts/
    },

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ["setup"]
    },
  ],
});
