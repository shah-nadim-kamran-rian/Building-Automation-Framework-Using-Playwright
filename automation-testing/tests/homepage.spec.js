const { test, expect } = require('@playwright/test');
const { AutomationExercisePage } = require('../pages/AutomationExercisePage');

test('HOME_001 - Homepage opens successfully', async ({ page }) => {
  const app = new AutomationExercisePage(page);

  await app.openHomePage();

  await expect(page).toHaveTitle(/Automation Exercise/);
  await expect(app.productsLink).toBeVisible();
  await expect(app.signupLoginLink).toBeVisible();
  await expect(app.contactUsLink).toBeVisible();
});