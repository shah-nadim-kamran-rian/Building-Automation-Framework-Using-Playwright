const { test, expect } = require('@playwright/test');

test.describe('Category and Brand Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(/googlesyndication|doubleclick|googleadservices|adservice|pagead/, route =>
      route.abort()
    );
  });

  test('user can view women dress category products', async ({ page }) => {
    await page.goto('https://automationexercise.com');

    await expect(page.locator('body')).toContainText('Category');

    await page.locator('a[href="#Women"]').click();
    await page.locator('a[href="/category_products/1"]').click();

    await expect(page).toHaveURL(/category_products\/1/);
    await expect(page.locator('body')).toContainText('Women - Dress Products');
  });

  test('user can view products by brand', async ({ page }) => {
    await page.goto('https://automationexercise.com/brand_products/Polo');

    await expect(page).toHaveURL(/brand_products\/Polo/);
    await expect(page.locator('body')).toContainText('Brand - Polo Products');
    await expect(page.locator('.features_items .product-image-wrapper').first()).toBeVisible({
      timeout: 15000
    });
  });
});