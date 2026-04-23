const { test, expect } = require('@playwright/test');
const { AutomationExercisePage } = require('../pages/AutomationExercisePage');
const testData = require('../test-data/userData');

test('CONT_009 - Valid contact form submits successfully', async ({ page }) => {
  const app = new AutomationExercisePage(page);

  await app.openHomePage();
  await app.openContactUs();
  await app.submitContactForm(
    testData.contactUser.name,
    testData.contactUser.email,
    testData.contactUser.subject,
    testData.contactUser.message
  );

  await expect(app.contactSuccessMessage).toBeVisible();
});