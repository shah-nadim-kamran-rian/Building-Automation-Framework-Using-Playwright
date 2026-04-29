const { test, expect } = require('@playwright/test');

test.describe('Subscription Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(/googlesyndication|doubleclick|googleadservices|adservice|pagead/, route =>
      route.abort()
    );
  });

  test('user can subscribe from homepage footer', async ({ page }) => {
    await page.goto('https://automationexercise.com');

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    await expect(page.locator('body')).toContainText('Subscription');

    await page.locator('#susbscribe_email').fill(`subscriber_${Date.now()}@test.com`);
    await page.locator('#subscribe').click();

    await expect(page.locator('body')).toContainText('You have been successfully subscribed!');
  });

  test('user can subscribe from cart page footer', async ({ page }) => {
    await page.goto('https://automationexercise.com/view_cart');

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    await expect(page.locator('body')).toContainText('Subscription');

    await page.locator('#susbscribe_email').fill(`cart_subscriber_${Date.now()}@test.com`);
    await page.locator('#subscribe').click();

    await expect(page.locator('body')).toContainText('You have been successfully subscribed!');
  });

  test('subscription email input is visible in footer', async ({ page }) => {
    await page.goto('https://automationexercise.com');

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    await expect(page.locator('#susbscribe_email')).toBeVisible();
    await expect(page.locator('#subscribe')).toBeVisible();
  });
});