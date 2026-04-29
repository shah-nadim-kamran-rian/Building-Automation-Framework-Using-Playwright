const { test, expect } = require('@playwright/test');

test.describe('Contact Validation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(/googlesyndication|doubleclick|googleadservices|adservice|pagead/, route =>
      route.abort()
    );
  });

  test('contact form fields are visible', async ({ page }) => {
    await page.goto('https://automationexercise.com/contact_us');

    await expect(page.locator('[data-qa="name"]')).toBeVisible();
    await expect(page.locator('[data-qa="email"]')).toBeVisible();
    await expect(page.locator('[data-qa="subject"]')).toBeVisible();
    await expect(page.locator('[data-qa="message"]')).toBeVisible();
    await expect(page.locator('[data-qa="submit-button"]')).toBeVisible();
  });

  test('contact email input uses email field type', async ({ page }) => {
    await page.goto('https://automationexercise.com/contact_us');

    await expect(page.locator('[data-qa="email"]')).toHaveAttribute('type', 'email');
  });

  test('contact form blocks invalid email format', async ({ page }) => {
    await page.goto('https://automationexercise.com/contact_us');

    await page.locator('[data-qa="name"]').fill('Invalid Email User');
    await page.locator('[data-qa="email"]').fill('invalid-email');
    await page.locator('[data-qa="subject"]').fill('Invalid Email Test');
    await page.locator('[data-qa="message"]').fill('Testing invalid email behavior.');

    await page.locator('[data-qa="submit-button"]').click();

    await expect(page).toHaveURL(/contact_us/);
  });
});