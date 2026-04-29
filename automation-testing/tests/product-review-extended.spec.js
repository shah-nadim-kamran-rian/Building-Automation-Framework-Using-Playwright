const { test, expect } = require('@playwright/test');

test.describe('Extended Product Review Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(/googlesyndication|doubleclick|googleadservices|adservice|pagead/, route =>
      route.abort()
    );
  });

  test('review form name email and review fields are visible', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');

    await page.locator('a[href^="/product_details/"]').first().click();

    await expect(page.locator('body')).toContainText('Write Your Review');

    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#review')).toBeVisible();
  });

  test('review email field uses email input type', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');

    await page.locator('a[href^="/product_details/"]').first().click();

    await expect(page.locator('#email')).toHaveAttribute('type', 'email');
  });

  test('review submit button is visible on product details page', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');

    await page.locator('a[href^="/product_details/"]').first().click();

    await expect(page.locator('#button-review')).toBeVisible();
  });
});