const { test, expect } = require('@playwright/test');

test.describe('Registration Boundary Tests', () => {
  test('signup form should block empty name and email', async ({ page }) => {
    await page.goto('https://automationexercise.com/login');

    await page.locator('[data-qa="signup-button"]').click();

    await expect(page).toHaveURL(/login/);
  });

  test('signup form should block invalid email format', async ({ page }) => {
    await page.goto('https://automationexercise.com/login');

    await page.locator('[data-qa="signup-name"]').fill('Test User');
    await page.locator('[data-qa="signup-email"]').fill('invalid-email');
    await page.locator('[data-qa="signup-button"]').click();

    await expect(page).toHaveURL(/login/);
  });

  test('signup should navigate to account information page with valid new email', async ({ page }) => {
    const uniqueEmail = `testuser_${Date.now()}@example.com`;

    await page.goto('https://automationexercise.com/login');

    await page.locator('[data-qa="signup-name"]').fill('Boundary User');
    await page.locator('[data-qa="signup-email"]').fill(uniqueEmail);
    await page.locator('[data-qa="signup-button"]').click();

    await expect(page.getByText('Enter Account Information')).toBeVisible();
  });
});