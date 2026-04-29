const { test, expect } = require('@playwright/test');

test.setTimeout(180000);

async function completeOrder(page) {
  const email = `invoice_user_${Date.now()}@test.com`;

  await page.goto('https://automationexercise.com/login');

  await page.locator('[data-qa="signup-name"]').fill('Invoice User');
  await page.locator('[data-qa="signup-email"]').fill(email);
  await page.locator('[data-qa="signup-button"]').click();

  await expect(page.locator('body')).toContainText('Enter Account Information');

  await page.locator('#id_gender1').check();
  await page.locator('[data-qa="password"]').fill('Test@12345');

  await page.locator('[data-qa="first_name"]').fill('Invoice');
  await page.locator('[data-qa="last_name"]').fill('User');
  await page.locator('[data-qa="address"]').fill('Invoice Address');
  await page.locator('[data-qa="country"]').selectOption('Canada');
  await page.locator('[data-qa="state"]').fill('Ontario');
  await page.locator('[data-qa="city"]').fill('Toronto');
  await page.locator('[data-qa="zipcode"]').fill('12345');
  await page.locator('[data-qa="mobile_number"]').fill('1234567890');

  await page.locator('[data-qa="create-account"]').click();

  await expect(page.locator('body')).toContainText('Account Created!');
  await page.locator('[data-qa="continue-button"]').click();

  await page.goto('https://automationexercise.com/products');

  const firstProduct = page.locator('.features_items .product-image-wrapper').first();

  await expect(firstProduct).toBeVisible({ timeout: 15000 });
  await firstProduct.scrollIntoViewIfNeeded();
  await firstProduct.hover();

  await firstProduct.getByText('Add to cart').first().click();

  await expect(page.getByText('Added!')).toBeVisible({ timeout: 15000 });

  await page.getByRole('link', { name: 'View Cart' }).click();
  await page.getByText('Proceed To Checkout').click();

  await expect(page.locator('body')).toContainText('Review Your Order');

  await page.getByText('Place Order').click();

  await expect(page).toHaveURL(/payment/, { timeout: 60000 });

  await page.locator('[data-qa="name-on-card"]').fill('Invoice Card');
  await page.locator('[data-qa="card-number"]').fill('4111111111111111');
  await page.locator('[data-qa="cvc"]').fill('123');
  await page.locator('[data-qa="expiry-month"]').fill('12');
  await page.locator('[data-qa="expiry-year"]').fill('2030');

  await page.locator('[data-qa="pay-button"]').click();

  await expect(page.locator('body')).toContainText(
    'Congratulations! Your order has been confirmed!',
    { timeout: 60000 }
  );
}

test.describe('Invoice Download Tests', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ page }) => {
    await page.route(/googlesyndication|doubleclick|googleadservices|adservice|pagead/, route =>
      route.abort()
    );
  });

  test('invoice download link is visible after successful order', async ({ page }) => {
    await completeOrder(page);

    await expect(page.getByText('Download Invoice')).toBeVisible({ timeout: 60000 });
  });

  test('user can click download invoice after successful order', async ({ page }) => {
    await completeOrder(page);

    const downloadLink = page.getByText('Download Invoice');

    await expect(downloadLink).toBeVisible({ timeout: 60000 });

    const downloadPromise = page.waitForEvent('download', { timeout: 60000 });

    await downloadLink.click();

    const download = await downloadPromise;

    expect(download.suggestedFilename().toLowerCase()).toContain('invoice');
  });
});