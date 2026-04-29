const { test, expect } = require('@playwright/test');

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(/googlesyndication|doubleclick|googleadservices|adservice|pagead/, route =>
      route.abort()
    );
  });

  async function clickHeaderLink(page, href) {
    const link = page.locator(`.navbar-nav a[href="${href}"]`).first();
    await expect(link).toBeVisible({ timeout: 15000 });
    await link.click();
  }

  test('header navigation links should open correct pages', async ({ page }) => {
    await page.goto('https://automationexercise.com');

    await clickHeaderLink(page, '/products');
    await expect(page).toHaveURL(/products/);
    await expect(page.locator('body')).toContainText('All Products');

    await clickHeaderLink(page, '/view_cart');
    await expect(page).toHaveURL(/view_cart/);
    await expect(page.locator('body')).toContainText('Shopping Cart');

    await clickHeaderLink(page, '/login');
    await expect(page).toHaveURL(/login/);
    await expect(page.locator('body')).toContainText('Login to your account');

    await clickHeaderLink(page, '/contact_us');
    await expect(page).toHaveURL(/contact_us/);
    await expect(page.locator('body')).toContainText('Get In Touch');
  });

  test('test cases page should open from header', async ({ page }) => {
    await page.goto('https://automationexercise.com');

    await clickHeaderLink(page, '/test_cases');

    await expect(page).toHaveURL(/test_cases/);
    await expect(page.locator('body')).toContainText('Test Cases');
  });
});