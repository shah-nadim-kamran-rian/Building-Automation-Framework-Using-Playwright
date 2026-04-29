const { test, expect } = require('@playwright/test');

test.describe('Product Catalog Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(/googlesyndication|doubleclick|googleadservices|adservice|pagead/, route =>
      route.abort()
    );
  });

  test('products page shows category and brand sections', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');

    await expect(page.locator('body')).toContainText('Category');
    await expect(page.locator('body')).toContainText('Brands');
  });

  test('products page shows at least one product card', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');

    const productCards = page.locator('.features_items .product-image-wrapper');

    await expect(productCards.first()).toBeVisible({ timeout: 15000 });
  });

  test('first product card shows price and add to cart action', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');

    const firstProduct = page.locator('.features_items .product-image-wrapper').first();

    await expect(firstProduct).toBeVisible({ timeout: 15000 });
    await expect(firstProduct).toContainText('Rs.');
    await expect(firstProduct.getByText('Add to cart').first()).toBeVisible();
  });

  test('first product card has view product link', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');

    await expect(page.locator('a[href^="/product_details/"]').first()).toBeVisible({
      timeout: 15000
    });
  });
});