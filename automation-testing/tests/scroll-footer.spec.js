const { test, expect } = require('@playwright/test');

test.describe('Scroll and Footer Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(/googlesyndication|doubleclick|googleadservices|adservice|pagead/, route =>
      route.abort()
    );
  });

  test('footer is visible after scrolling to bottom', async ({ page }) => {
    await page.goto('https://automationexercise.com');

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('body')).toContainText('Subscription');
  });

  test('scroll up button appears after scrolling down', async ({ page }) => {
    await page.goto('https://automationexercise.com');

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    await expect(page.locator('#scrollUp')).toBeVisible({ timeout: 10000 });
  });

  test('user can scroll back to top using scroll up button', async ({ page }) => {
    await page.goto('https://automationexercise.com');

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const scrollUpButton = page.locator('#scrollUp');

    await expect(scrollUpButton).toBeVisible({ timeout: 10000 });

    await scrollUpButton.click();

    await expect(page.locator('body')).toContainText(
      'Full-Fledged practice website for Automation Engineers'
    );
  });
});