const { test, expect } = require('@playwright/test');

test.describe('Product Review Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(/googlesyndication|doubleclick|googleadservices|adservice|pagead/, route =>
      route.abort()
    );
  });

  test('product detail page shows review form', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');

    await page.locator('a[href^="/product_details/"]').first().click();

    await expect(page).toHaveURL(/product_details/);
    await expect(page.locator('body')).toContainText('Write Your Review');

    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#review')).toBeVisible();
    await expect(page.locator('#button-review')).toBeVisible();
  });

  test('user can submit product review', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');

    await page.locator('a[href^="/product_details/"]').first().click();

    await expect(page.locator('body')).toContainText('Write Your Review');

    await page.locator('#name').fill('Review User');
    await page.locator('#email').fill(`review_${Date.now()}@test.com`);
    await page.locator('#review').fill('This is a product review created during Playwright testing.');

    await page.locator('#button-review').click();

    await expect(page.locator('body')).toContainText('Thank you for your review.');
  });
});