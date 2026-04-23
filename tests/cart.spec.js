const { test, expect } = require('@playwright/test');
const { AutomationExercisePage } = require('../pages/AutomationExercisePage');

test('FLOW_004 - Guest user adds item then is prompted to login at checkout', async ({ page }) => {
  const app = new AutomationExercisePage(page);

  await app.openHomePage();
  await page.waitForLoadState('domcontentloaded');

  await app.goToProducts();
  await page.waitForLoadState('domcontentloaded');

  const firstViewProduct = page.locator('a:has-text("View Product")').first();
  await expect(firstViewProduct).toBeVisible({ timeout: 15000 });
  await firstViewProduct.scrollIntoViewIfNeeded();
  await firstViewProduct.click();

  await page.waitForLoadState('domcontentloaded');

  const addToCartButton = page.locator('button:has-text("Add to cart")').first();
  await expect(addToCartButton).toBeVisible({ timeout: 15000 });
  await addToCartButton.scrollIntoViewIfNeeded();
  await addToCartButton.click();

  await expect(page.locator('text=Added!')).toBeVisible({ timeout: 15000 });

  await page.goto('https://automationexercise.com/view_cart');
  await page.waitForLoadState('domcontentloaded');

  await expect(app.proceedToCheckoutButton).toBeVisible({ timeout: 15000 });
  await app.proceedToCheckoutButton.click();

  await expect(app.registerLoginLink).toBeVisible({ timeout: 15000 });
});