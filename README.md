<div align=center>

<h1>
💾 playwright-authenticate-state
</h1>

</div>

## Install project 

```bash 
git clone https://github.com/vinceLer/playwright-authenticate-state.git
```

```bash 
cd ./playwright-authenticate-state
```

```bash 
pnpm install 
```

## CLI 

### Run setup files 

```bash 
pnpm exec playwright test --project=setup
```

### Run tests (with setup files)

```bash 
pnpm exec playwright test
```

### Run only test files 

Comment the line `dependencies: ["setup"]` in the `playwright.config.ts`.

And run : 

```bash 
pnpm exec playwright test
```

## This project from Scratch 

### Implement setup file 

Initialize setup script that will save the user session context : 

```ts 
import { test as setup } from '@playwright/test';

import path from 'path';

const USER_FILE = path.join(
    __dirname,
    '../../common/.auth/standard-user.sauce-demo.json' // where the session storage will be save
);

setup('[setup] Standard user session', async ({ page }) => {

    // Login code
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.locator('[data-test="title"]').waitFor();

    // Save context
    await page.context().storageState({ path: USER_FILE });
});
```

### Configure setup as a project 

Add this line in the `playwright.config.ts` : 

```ts 
projects: [
    { name: 'setup',
      testMatch: /.*\.setup\.ts/
    },

    // ...
  ],
```

Add this line below directly in in `playwright.config.ts` for the target project to run `setup` file(s) before each project execution : 

```bash
dependencies: ["setup"]
```

### Use authenticate state session in test  

Import session state to the test file : 

```ts 
// example.spec.ts 
import { test } from '@playwright/test';

test.use({ storageState: 'common/.auth/standard-user.sauce-demo.json' });

test('Storage state test', async ({ page }) => {
  // Session logged 

  // ... 
});

```
