const { test, expect } = require('@playwright/test');

test.describe('Auth UI Validation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(/googlesyndication|doubleclick|googleadservices|adservice|pagead/, route =>
      route.abort()
    );
  });

  test('login form fields and button are visible', async ({ page }) => {
    await page.goto('https://automationexercise.com/login');

    await expect(page.locator('[data-qa="login-email"]')).toBeVisible();
    await expect(page.locator('[data-qa="login-password"]')).toBeVisible();
    await expect(page.locator('[data-qa="login-button"]')).toBeVisible();
  });

  test('signup form fields and button are visible', async ({ page }) => {
    await page.goto('https://automationexercise.com/login');

    await expect(page.locator('[data-qa="signup-name"]')).toBeVisible();
    await expect(page.locator('[data-qa="signup-email"]')).toBeVisible();
    await expect(page.locator('[data-qa="signup-button"]')).toBeVisible();
  });

  test('login email input uses email field type', async ({ page }) => {
    await page.goto('https://automationexercise.com/login');

    await expect(page.locator('[data-qa="login-email"]')).toHaveAttribute('type', 'email');
  });

  test('signup email input uses email field type', async ({ page }) => {
    await page.goto('https://automationexercise.com/login');

    await expect(page.locator('[data-qa="signup-email"]')).toHaveAttribute('type', 'email');
  });
});