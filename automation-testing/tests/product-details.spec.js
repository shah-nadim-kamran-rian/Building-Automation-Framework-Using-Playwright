const { test, expect } = require('@playwright/test');

test.describe('Product Details Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(/googlesyndication|doubleclick|googleadservices|adservice|pagead/, route =>
      route.abort()
    );
  });

  test('user can open product detail page and verify product information', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');

    await expect(page.locator('body')).toContainText('All Products');

    await page.locator('a[href^="/product_details/"]').first().click();

    await expect(page).toHaveURL(/product_details/);

    const productInfo = page.locator('.product-information');

    await expect(productInfo).toBeVisible({ timeout: 15000 });
    await expect(productInfo).toContainText('Category');
    await expect(productInfo).toContainText('Availability');
    await expect(productInfo).toContainText('Condition');
    await expect(productInfo).toContainText('Brand');
  });

  test('user can add product to cart from product details page', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');

    await expect(page.locator('body')).toContainText('All Products');

    await page.locator('a[href^="/product_details/"]').first().click();

    const productInfo = page.locator('.product-information');

    await expect(productInfo).toBeVisible({ timeout: 15000 });

    await page.locator('#quantity').fill('2');
    await page.getByRole('button', { name: 'Add to cart' }).click();

    await expect(page.getByText('Added!')).toBeVisible({ timeout: 15000 });

    await page.getByRole('link', { name: 'View Cart' }).click();

    await expect(page).toHaveURL(/view_cart/);
    await expect(page.locator('.cart_quantity')).toContainText('2');
  });
});