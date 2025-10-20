import { test as setup } from '@playwright/test';

import path from 'path';

const USER_FILE = path.join(
    __dirname,
    '../../common/.auth/standard-user.sauce-demo.json'
);

setup('[setup] Standard user session', async ({ page }) => {

    // Login code
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.locator('[data-test="title"]').waitFor();
    await page.context().storageState({ path: USER_FILE });
});