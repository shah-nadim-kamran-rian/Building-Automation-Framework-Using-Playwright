const { test, expect } = require('@playwright/test');

async function registerUser(page) {
  const email = `logout_user_${Date.now()}@test.com`;

  await page.goto('https://automationexercise.com/login');

  await page.locator('[data-qa="signup-name"]').fill('Logout User');
  await page.locator('[data-qa="signup-email"]').fill(email);
  await page.locator('[data-qa="signup-button"]').click();

  await expect(page.locator('body')).toContainText('Enter Account Information');

  await page.locator('#id_gender1').check();
  await page.locator('[data-qa="password"]').fill('Test@12345');
  await page.locator('[data-qa="days"]').selectOption('10');
  await page.locator('[data-qa="months"]').selectOption('5');
  await page.locator('[data-qa="years"]').selectOption('1998');

  await page.locator('[data-qa="first_name"]').fill('Logout');
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

test.describe('Logout and Session Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(/googlesyndication|doubleclick|googleadservices|adservice|pagead/, route =>
      route.abort()
    );
  });

  test('logged in user can logout successfully', async ({ page }) => {
    await registerUser(page);

    await page.locator('a[href="/logout"]').click();

    await expect(page).toHaveURL(/login/);
    await expect(page.locator('body')).toContainText('Login to your account');
  });

  test('logged in user sees logout link in header', async ({ page }) => {
    await registerUser(page);

    await expect(page.locator('a[href="/logout"]')).toBeVisible();
  });

  test('logged in user sees delete account link in header', async ({ page }) => {
    await registerUser(page);

    await expect(page.locator('a[href="/delete_account"]')).toBeVisible();
  });
});