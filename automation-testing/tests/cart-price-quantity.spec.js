const { test, expect } = require('@playwright/test');

test.describe('Cart Price and Quantity Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(/googlesyndication|doubleclick|googleadservices|adservice|pagead/, route =>
      route.abort()
    );
  });

  async function addFirstProductToCart(page) {
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
  }

  test('cart page shows product description', async ({ page }) => {
    await addFirstProductToCart(page);

    await expect(page.locator('.cart_description')).toBeVisible();
  });

  test('cart page shows product price', async ({ page }) => {
    await addFirstProductToCart(page);

    await expect(page.locator('.cart_price')).toContainText('Rs.');
  });

  test('cart page shows product quantity', async ({ page }) => {
    await addFirstProductToCart(page);

    await expect(page.locator('.cart_quantity')).toBeVisible();
  });

  test('cart page shows product total price', async ({ page }) => {
    await addFirstProductToCart(page);

    await expect(page.locator('.cart_total')).toContainText('Rs.');
  });

  test('cart row contains price quantity and total columns', async ({ page }) => {
    await addFirstProductToCart(page);

    await expect(page.locator('.cart_price')).toBeVisible();
    await expect(page.locator('.cart_quantity')).toBeVisible();
    await expect(page.locator('.cart_total')).toBeVisible();
  });
});