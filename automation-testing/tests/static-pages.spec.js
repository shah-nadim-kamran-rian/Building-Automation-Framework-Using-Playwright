const { test, expect } = require('@playwright/test');

test.describe('Static Pages Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(/googlesyndication|doubleclick|googleadservices|adservice|pagead/, route =>
      route.abort()
    );
  });

  test('test cases page opens successfully', async ({ page }) => {
    await page.goto('https://automationexercise.com/test_cases');

    await expect(page).toHaveURL(/test_cases/);
    await expect(page.locator('body')).toContainText('Test Cases');
  });

  test('api testing page opens successfully', async ({ page }) => {
    await page.goto('https://automationexercise.com/api_list');

    await expect(page).toHaveURL(/api_list/);
    await expect(page.locator('body')).toContainText(/API|APIs/i);
  });

  test('contact page displays feedback section', async ({ page }) => {
    await page.goto('https://automationexercise.com/contact_us');

    await expect(page.locator('body')).toContainText('Get In Touch');
    await expect(page.locator('body')).toContainText('Feedback For Us');
  });
});