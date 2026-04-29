const { test, expect } = require('@playwright/test');

test.describe('Product Extra Validation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(/googlesyndication|doubleclick|googleadservices|adservice|pagead/, route =>
      route.abort()
    );
  });

  test('product detail page quantity field has default value 1', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');

    await page.locator('a[href^="/product_details/"]').first().click();

    await expect(page).toHaveURL(/product_details/);
    await expect(page.locator('#quantity')).toHaveValue('1');
  });

  test('product detail page shows price information', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');

    await page.locator('a[href^="/product_details/"]').first().click();

    const productInfo = page.locator('.product-information');

    await expect(productInfo).toBeVisible({ timeout: 15000 });
    await expect(productInfo).toContainText('Rs.');
  });

  test('product detail page shows add to cart button', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');

    await page.locator('a[href^="/product_details/"]').first().click();

    await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible({
      timeout: 15000
    });
  });

  test('product detail page quantity can be changed', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');

    await page.locator('a[href^="/product_details/"]').first().click();

    const quantityInput = page.locator('#quantity');

    await quantityInput.fill('3');

    await expect(quantityInput).toHaveValue('3');
  });

  test('product detail page keeps product information visible after quantity change', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');

    await page.locator('a[href^="/product_details/"]').first().click();

    await page.locator('#quantity').fill('4');

    const productInfo = page.locator('.product-information');

    await expect(productInfo).toBeVisible({ timeout: 15000 });
    await expect(productInfo).toContainText('Availability');
    await expect(productInfo).toContainText('Brand');
  });
});