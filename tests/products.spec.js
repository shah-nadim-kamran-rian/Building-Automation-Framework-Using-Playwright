const { test, expect } = require('@playwright/test');
const { AutomationExercisePage } = require('../pages/AutomationExercisePage');
const testData = require('../test-data/userData');

test('PROD_012 - Search with valid keyword returns results', async ({ page }) => {
  const app = new AutomationExercisePage(page);

  await app.openHomePage();
  await page.waitForTimeout(2000);

  await app.closeAdIfVisible();
  await app.goToProducts();
  await page.waitForTimeout(2000);

  await app.closeAdIfVisible();
  await app.searchProduct(testData.searchKeyword);
  await page.waitForTimeout(2000);

  await expect(app.searchedProductsTitle).toBeVisible();
  const results = page.locator('.product-image-wrapper');
  await expect(results.first()).toBeVisible();
});