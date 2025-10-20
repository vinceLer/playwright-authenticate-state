import { test, expect } from '@playwright/test';

test.use({ storageState: 'common/.auth/standard-user.sauce-demo.json' });

test('Check session logged', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');
  expect.soft(await page.locator('[data-test="title"]').textContent()).toMatch('Products');
});
