const { test, expect } = require('@playwright/test');
const { AutomationExercisePage } = require('../pages/AutomationExercisePage');
const { generateEmail } = require('../utils/randomData');

test('AUTH_014 / FLOW_001 - Create new user and verify logged in state', async ({ page }) => {
  const app = new AutomationExercisePage(page);
  const email = generateEmail();
  const password = 'Test@12345';

  await app.openHomePage();
  await app.goToSignupLogin();
  await app.signupNewUser('Test User', email);
  await app.fillAccountInformation(password);

  await expect(app.accountCreatedText).toBeVisible();
  await app.continueButton.click();

  await expect(app.loggedInText).toBeVisible();
});