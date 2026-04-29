const { test, expect } = require('@playwright/test');

test('PROD_012 - Search with valid keyword returns results', async ({ page }) => {
  await page.route(/googlesyndication|doubleclick|googleadservices|adservice|pagead/, route =>
    route.abort()
  );

  await page.goto('https://automationexercise.com/products');

  await expect(page.locator('body')).toContainText('All Products');

  await page.locator('#search_product').fill('Dress');
  await page.locator('#submit_search').click();

  await expect(page.locator('body')).toContainText('Searched Products');

  const productCards = page.locator('.features_items .product-image-wrapper');

  await expect(productCards.first()).toBeVisible({ timeout: 15000 });
});