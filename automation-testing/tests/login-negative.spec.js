const { test, expect } = require('@playwright/test');

test.describe('Login Negative Tests', () => {
  test('user cannot login with invalid credentials', async ({ page }) => {
    await page.goto('https://automationexercise.com/login');

    await page.locator('[data-qa="login-email"]').fill('invaliduser@test.com');
    await page.locator('[data-qa="login-password"]').fill('wrongpassword');
    await page.locator('[data-qa="login-button"]').click();

    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
  });

  test('login form blocks invalid email format', async ({ page }) => {
    await page.goto('https://automationexercise.com/login');

    await page.locator('[data-qa="login-email"]').fill('invalid-email');
    await page.locator('[data-qa="login-password"]').fill('Test@12345');
    await page.locator('[data-qa="login-button"]').click();

    await expect(page).toHaveURL(/login/);
  });

  test('password field masks typed password', async ({ page }) => {
    await page.goto('https://automationexercise.com/login');

    const passwordInput = page.locator('[data-qa="login-password"]');

    await expect(passwordInput).toHaveAttribute('type', 'password');
  });
});