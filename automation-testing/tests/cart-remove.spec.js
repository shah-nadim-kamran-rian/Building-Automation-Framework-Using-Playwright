const { test, expect } = require('@playwright/test');

test.describe('Cart Remove Tests', () => {
  test('user can remove product from cart', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');

    await expect(page.getByText('All Products')).toBeVisible();

    await page.locator('.features_items .product-image-wrapper').first().hover();
    await page
      .locator('.features_items .product-image-wrapper')
      .first()
      .getByText('Add to cart')
      .first()
      .click();

    await expect(page.getByText('Added!')).toBeVisible();

    await page.getByRole('link', { name: 'View Cart' }).click();

    await expect(page).toHaveURL(/view_cart/);
    await expect(page.locator('.cart_description')).toBeVisible();

    await page.locator('.cart_quantity_delete').first().click();

    await expect(page.getByText('Cart is empty!')).toBeVisible();
  });
});