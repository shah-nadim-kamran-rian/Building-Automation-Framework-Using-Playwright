const { test, expect } = require('@playwright/test');

test.describe('Product Search Tests', () => {
  test('user can search product with valid keyword', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');

    await expect(page.getByText('All Products')).toBeVisible();

    await page.locator('#search_product').fill('dress');
    await page.locator('#submit_search').click();

    await expect(page.getByText('Searched Products')).toBeVisible();
    await expect(page.locator('.features_items .product-image-wrapper').first()).toBeVisible();
  });

  test('search with uppercase keyword works', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');

    await page.locator('#search_product').fill('DRESS');
    await page.locator('#submit_search').click();

    await expect(page.getByText('Searched Products')).toBeVisible();
    await expect(page.locator('.features_items .product-image-wrapper').first()).toBeVisible();
  });

  test('search with invalid keyword shows no matching product cards', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');

    await page.locator('#search_product').fill('zzzzzzinvalidproduct');
    await page.locator('#submit_search').click();

    await expect(page.getByText('Searched Products')).toBeVisible();

    const productCount = await page.locator('.features_items .product-image-wrapper').count();
    expect(productCount).toBe(0);
  });
});