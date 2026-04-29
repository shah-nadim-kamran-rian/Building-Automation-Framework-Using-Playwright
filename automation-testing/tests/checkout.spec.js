const { test, expect } = require('@playwright/test');

test.describe('Checkout Tests', () => {
  test('guest user should see login/register prompt when proceeding to checkout', async ({ page }) => {
    await page.goto('https://automationexercise.com');

    await expect(page).toHaveTitle(/Automation Exercise/);

    await page.locator('.features_items .product-image-wrapper').first().hover();
    await page.locator('.features_items .product-image-wrapper').first().getByText('Add to cart').first().click();

    await expect(page.getByText('Added!')).toBeVisible();

    await page.getByRole('link', { name: 'View Cart' }).click();

    await expect(page).toHaveURL(/view_cart/);
    await expect(page.getByText('Shopping Cart')).toBeVisible();

    await page.getByText('Proceed To Checkout').click();

    await expect(page.getByText('Register / Login account to proceed on checkout.')).toBeVisible();
  });
});