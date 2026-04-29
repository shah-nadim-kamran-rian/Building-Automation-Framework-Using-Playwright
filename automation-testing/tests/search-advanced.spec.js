const { test, expect } = require('@playwright/test');

test.describe('Advanced Product Search Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(/googlesyndication|doubleclick|googleadservices|adservice|pagead/, route =>
      route.abort()
    );
  });

  test('search with partial keyword returns product results', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');

    await expect(page.locator('body')).toContainText('All Products');

    await page.locator('#search_product').fill('Top');
    await page.locator('#submit_search').click();

    await expect(page.locator('body')).toContainText('Searched Products');
    await expect(page.locator('.features_items .product-image-wrapper').first()).toBeVisible({
      timeout: 15000
    });
  });

  test('search with lowercase keyword returns product results', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');

    await page.locator('#search_product').fill('dress');
    await page.locator('#submit_search').click();

    await expect(page.locator('body')).toContainText('Searched Products');
    await expect(page.locator('.features_items .product-image-wrapper').first()).toBeVisible({
      timeout: 15000
    });
  });

  test('search with mixed case keyword returns product results', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');

    await page.locator('#search_product').fill('DrEsS');
    await page.locator('#submit_search').click();

    await expect(page.locator('body')).toContainText('Searched Products');
    await expect(page.locator('.features_items .product-image-wrapper').first()).toBeVisible({
      timeout: 15000
    });
  });

  test('search with special characters shows searched products section', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');

    await page.locator('#search_product').fill('@@@@');
    await page.locator('#submit_search').click();

    await expect(page.locator('body')).toContainText('Searched Products');
  });

  test('empty search submission keeps user on products page', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');

    await page.locator('#submit_search').click();

    await expect(page).toHaveURL(/products/);
    await expect(page.locator('body')).toContainText('All Products');
  });
});