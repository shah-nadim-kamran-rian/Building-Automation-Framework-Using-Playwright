const path = require('path');
const { test, expect } = require('@playwright/test');

test.describe('Contact File Upload Tests', () => {
  test('user can submit contact form with file upload', async ({ page }) => {
    await page.goto('https://automationexercise.com/contact_us');

    await expect(page.locator('body')).toContainText('Get In Touch');

    await page.locator('[data-qa="name"]').fill('Test User');
    await page.locator('[data-qa="email"]').fill('testuser@example.com');
    await page.locator('[data-qa="subject"]').fill('Playwright File Upload Test');
    await page.locator('[data-qa="message"]').fill('Testing contact form with file upload.');

    const filePath = path.join(__dirname, 'sample-upload.txt');
    await page.locator('input[name="upload_file"]').setInputFiles(filePath);

    page.once('dialog', async dialog => {
      await dialog.accept();
    });

    await page.locator('[data-qa="submit-button"]').click();

    await expect(page.locator('body')).toContainText(
      'Success! Your details have been submitted successfully.'
    );
  });
});