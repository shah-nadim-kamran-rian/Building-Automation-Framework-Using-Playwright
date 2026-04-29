const { test, expect } = require('@playwright/test');

async function startSignup(page, name, email) {
  await page.goto('https://automationexercise.com/login');

  await page.locator('[data-qa="signup-name"]').fill(name);
  await page.locator('[data-qa="signup-email"]').fill(email);
  await page.locator('[data-qa="signup-button"]').click();
}

async function createAccount(page, email) {
  await startSignup(page, 'Duplicate User', email);

  await expect(page.locator('body')).toContainText('Enter Account Information');

  await page.locator('#id_gender1').check();
  await page.locator('[data-qa="password"]').fill('Test@12345');

  await page.locator('[data-qa="days"]').selectOption('10');
  await page.locator('[data-qa="months"]').selectOption('5');
  await page.locator('[data-qa="years"]').selectOption('1998');

  await page.locator('[data-qa="first_name"]').fill('Duplicate');
  await page.locator('[data-qa="last_name"]').fill('User');
  await page.locator('[data-qa="address"]').fill('Test Address');
  await page.locator('[data-qa="country"]').selectOption('Canada');
  await page.locator('[data-qa="state"]').fill('Ontario');
  await page.locator('[data-qa="city"]').fill('Toronto');
  await page.locator('[data-qa="zipcode"]').fill('12345');
  await page.locator('[data-qa="mobile_number"]').fill('1234567890');

  await page.locator('[data-qa="create-account"]').click();

  await expect(page.locator('body')).toContainText('Account Created!');
  await page.locator('[data-qa="continue-button"]').click();

  await expect(page.locator('body')).toContainText('Logged in as');
}

test.describe('Duplicate Signup Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(/googlesyndication|doubleclick|googleadservices|adservice|pagead/, route =>
      route.abort()
    );
  });

  test('signup with existing email shows error message', async ({ page }) => {
    const email = `duplicate_${Date.now()}@test.com`;

    await createAccount(page, email);

    await page.locator('a[href="/logout"]').click();

    await startSignup(page, 'Duplicate User', email);

    await expect(page.locator('body')).toContainText('Email Address already exist!');
  });

  test('duplicate signup keeps signup form visible', async ({ page }) => {
    const email = `duplicate_page_${Date.now()}@test.com`;

    await createAccount(page, email);

    await page.locator('a[href="/logout"]').click();

    await startSignup(page, 'Duplicate User', email);

    await expect(page.locator('body')).toContainText('Email Address already exist!');
    await expect(page.locator('[data-qa="signup-name"]')).toBeVisible();
    await expect(page.locator('[data-qa="signup-email"]')).toBeVisible();
    await expect(page.locator('[data-qa="signup-button"]')).toBeVisible();
  });

  test('duplicate signup error is visible near signup form', async ({ page }) => {
    const email = `duplicate_error_${Date.now()}@test.com`;

    await createAccount(page, email);

    await page.locator('a[href="/logout"]').click();

    await startSignup(page, 'Duplicate User', email);

    await expect(page.getByText('Email Address already exist!')).toBeVisible();
  });
});