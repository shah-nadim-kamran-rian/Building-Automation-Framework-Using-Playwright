const { test, expect } = require('@playwright/test');

async function registerUser(page) {
  const email = `e2e_registered_${Date.now()}@test.com`;

  await page.goto('https://automationexercise.com/login');

  await page.locator('[data-qa="signup-name"]').fill('Registered E2E User');
  await page.locator('[data-qa="signup-email"]').fill(email);
  await page.locator('[data-qa="signup-button"]').click();

  await expect(page.locator('body')).toContainText('Enter Account Information');

  await page.locator('#id_gender1').check();
  await page.locator('[data-qa="password"]').fill('Test@12345');

  await page.locator('[data-qa="first_name"]').fill('Registered');
  await page.locator('[data-qa="last_name"]').fill('User');
  await page.locator('[data-qa="address"]').fill('Registered Checkout Address');
  await page.locator('[data-qa="country"]').selectOption('Canada');
  await page.locator('[data-qa="state"]').fill('Ontario');
  await page.locator('[data-qa="city"]').fill('Toronto');
  await page.locator('[data-qa="zipcode"]').fill('12345');
  await page.locator('[data-qa="mobile_number"]').fill('1234567890');

  await page.locator('[data-qa="create-account"]').click();

  await expect(page.locator('body')).toContainText('Account Created!');
  await page.locator('[data-qa="continue-button"]').click();

  await expect(page.locator('body')).toContainText('Logged in as');
}

test.describe('Registered User End-to-End Checkout Tests', () => {
  test.describe.configure({ mode: 'serial' });
  test.setTimeout(120000);
  test.beforeEach(async ({ page }) => {
    await page.route(/googlesyndication|doubleclick|googleadservices|adservice|pagead/, route =>
      route.abort()
    );
  });

  test('registered user can add product and reach payment page', async ({ page }) => {
    await registerUser(page);

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

    await expect(page).toHaveURL(/payment/);
  });

  test('registered user can complete full checkout order', async ({ page }) => {
    await registerUser(page);

    await page.goto('https://automationexercise.com/products');

    const firstProduct = page.locator('.features_items .product-image-wrapper').first();

    await expect(firstProduct).toBeVisible({ timeout: 15000 });
    await firstProduct.scrollIntoViewIfNeeded();
    await firstProduct.hover();

    await firstProduct.getByText('Add to cart').first().click();

    await expect(page.getByText('Added!')).toBeVisible({ timeout: 15000 });

    await page.getByRole('link', { name: 'View Cart' }).click();
    await page.getByText('Proceed To Checkout').click();

    await page.locator('textarea[name="message"]').fill('Registered user full checkout test.');

    await page.getByText('Place Order').click();

    await page.locator('[data-qa="name-on-card"]').fill('Registered Card');
    await page.locator('[data-qa="card-number"]').fill('4111111111111111');
    await page.locator('[data-qa="cvc"]').fill('123');
    await page.locator('[data-qa="expiry-month"]').fill('12');
    await page.locator('[data-qa="expiry-year"]').fill('2030');

    await page.locator('[data-qa="pay-button"]').click();

    await expect(page.locator('body')).toContainText('Congratulations! Your order has been confirmed!');
  });
});