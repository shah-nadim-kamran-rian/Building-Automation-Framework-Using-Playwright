const { test, expect } = require('@playwright/test');

test.describe('Extended Category and Brand Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(/googlesyndication|doubleclick|googleadservices|adservice|pagead/, route =>
      route.abort()
    );
  });

  test('user can view men tshirts category products', async ({ page }) => {
    await page.goto('https://automationexercise.com');

    await expect(page.locator('body')).toContainText('Category');

    await page.locator('a[href="#Men"]').click();
    await page.locator('a[href="/category_products/3"]').click();

    await expect(page).toHaveURL(/category_products\/3/);
    await expect(page.locator('body')).toContainText('Men - Tshirts Products');
  });

  test('user can view women tops category products', async ({ page }) => {
    await page.goto('https://automationexercise.com');

    await expect(page.locator('body')).toContainText('Category');

    await page.locator('a[href="#Women"]').click();
    await page.locator('a[href="/category_products/2"]').click();

    await expect(page).toHaveURL(/category_products\/2/);
    await expect(page.locator('body')).toContainText('Women - Tops Products');
  });

  test('user can view baby kids dress category products', async ({ page }) => {
    await page.goto('https://automationexercise.com');

    await expect(page.locator('body')).toContainText('Category');

    await page.locator('a[href="#Kids"]').click();
    await page.locator('a[href="/category_products/4"]').click();

    await expect(page).toHaveURL(/category_products\/4/);
    await expect(page.locator('body')).toContainText('Kids - Dress Products');
  });

  test('user can view H and M brand products', async ({ page }) => {
    await page.goto('https://automationexercise.com/brand_products/H&M');

    await expect(page).toHaveURL(/brand_products/);
    await expect(page.locator('body')).toContainText('Brand - H&M Products');
    await expect(page.locator('.features_items .product-image-wrapper').first()).toBeVisible({
      timeout: 15000
    });
  });
});