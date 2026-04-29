const { test, expect } = require('@playwright/test');

test.describe('End-to-End User Flow Tests', () => {
  test('guest user can search product add to cart and reach checkout prompt', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');

    await page.locator('#search_product').fill('dress');
    await page.locator('#submit_search').click();

    await expect(page.getByText('Searched Products')).toBeVisible();

    await page.locator('.features_items .product-image-wrapper').first().hover();
    await page.locator('.features_items .product-image-wrapper').first().getByText('Add to cart').first().click();

    await expect(page.getByText('Added!')).toBeVisible();

    await page.getByRole('link', { name: 'View Cart' }).click();

    await expect(page).toHaveURL(/view_cart/);

    await page.getByText('Proceed To Checkout').click();

    await expect(page.getByText('Register / Login account to proceed on checkout.')).toBeVisible();
  });
});