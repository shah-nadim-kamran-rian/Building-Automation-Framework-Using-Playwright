const { test, expect } = require('@playwright/test');

test.describe('Cart Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(/googlesyndication|doubleclick|googleadservices|adservice|pagead/, route =>
      route.abort()
    );
  });

  test('FLOW_004 - Guest user adds item then is prompted to login at checkout', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');

    await expect(page.locator('body')).toContainText('All Products');

    const firstProduct = page.locator('.features_items .product-image-wrapper').first();

    await expect(firstProduct).toBeVisible({ timeout: 15000 });
    await firstProduct.scrollIntoViewIfNeeded();
    await firstProduct.hover();

    await firstProduct.getByText('Add to cart').first().click();

    await expect(page.getByText('Added!')).toBeVisible({ timeout: 15000 });

    await page.getByRole('link', { name: 'View Cart' }).click();

    await expect(page).toHaveURL(/view_cart/);
    await expect(page.locator('body')).toContainText('Shopping Cart');

    await page.getByText('Proceed To Checkout').click();

    await expect(page.locator('body')).toContainText(
      'Register / Login account to proceed on checkout.'
    );
  });
});