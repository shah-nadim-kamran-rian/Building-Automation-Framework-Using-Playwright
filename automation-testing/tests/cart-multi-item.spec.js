const { test, expect } = require('@playwright/test');

test.describe('Multi Item Cart Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(/googlesyndication|doubleclick|googleadservices|adservice|pagead/, route =>
      route.abort()
    );
  });

  async function addProductByIndex(page, index) {
    const product = page.locator('.features_items .product-image-wrapper').nth(index);

    await expect(product).toBeVisible({ timeout: 15000 });
    await product.scrollIntoViewIfNeeded();
    await product.hover();

    await product.getByText('Add to cart').first().click();

    await expect(page.getByText('Added!')).toBeVisible({ timeout: 15000 });
  }

  test('user can add two different products to cart', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');

    await expect(page.locator('body')).toContainText('All Products');

    await addProductByIndex(page, 0);
    await page.getByRole('button', { name: 'Continue Shopping' }).click();

    await addProductByIndex(page, 1);
    await page.getByRole('link', { name: 'View Cart' }).click();

    await expect(page).toHaveURL(/view_cart/);
    await expect(page.locator('tr[id^="product-"]')).toHaveCount(2);
  });

  test('cart keeps products after page refresh', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');

    await expect(page.locator('body')).toContainText('All Products');

    await addProductByIndex(page, 0);
    await page.getByRole('button', { name: 'Continue Shopping' }).click();

    await addProductByIndex(page, 1);
    await page.getByRole('link', { name: 'View Cart' }).click();

    await expect(page.locator('tr[id^="product-"]')).toHaveCount(2);

    await page.reload();

    await expect(page.locator('tr[id^="product-"]')).toHaveCount(2);
  });

  test('cart shows proceed to checkout button when products exist', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');

    await expect(page.locator('body')).toContainText('All Products');

    await addProductByIndex(page, 0);
    await page.getByRole('link', { name: 'View Cart' }).click();

    await expect(page).toHaveURL(/view_cart/);
    await expect(page.getByText('Proceed To Checkout')).toBeVisible();
  });
});