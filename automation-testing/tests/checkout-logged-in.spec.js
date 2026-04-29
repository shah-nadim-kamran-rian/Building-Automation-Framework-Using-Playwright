const { test, expect } = require('@playwright/test');

async function createUser(page) {
  const email = `checkout_user_${Date.now()}@test.com`;

  await page.goto('https://automationexercise.com/login');

  await page.locator('[data-qa="signup-name"]').fill('Checkout User');
  await page.locator('[data-qa="signup-email"]').fill(email);
  await page.locator('[data-qa="signup-button"]').click();

  await expect(page.locator('body')).toContainText('Enter Account Information');

  await page.locator('#id_gender1').check();
  await page.locator('[data-qa="password"]').fill('Test@12345');

  await page.locator('[data-qa="days"]').selectOption('10');
  await page.locator('[data-qa="months"]').selectOption('5');
  await page.locator('[data-qa="years"]').selectOption('1998');

  await page.locator('[data-qa="first_name"]').fill('Checkout');
  await page.locator('[data-qa="last_name"]').fill('User');
  await page.locator('[data-qa="address"]').fill('Test Address 123');
  await page.locator('[data-qa="country"]').selectOption('Canada');
  await page.locator('[data-qa="state"]').fill('Ontario');
  await page.locator('[data-qa="city"]').fill('Toronto');
  await page.locator('[data-qa="zipcode"]').fill('12345');
  await page.locator('[data-qa="mobile_number"]').fill('1234567890');

  await page.locator('[data-qa="create-account"]').click();

  await expect(page.locator('body')).toContainText('Account Created!');
  await page.locator('[data-qa="continue-button"]').click();

  await expect(page.locator('body')).toContainText('Logged in as');

  return email;
}

async function addProductAndGoToCheckout(page) {
  await page.goto('https://automationexercise.com/products');

  await expect(page.locator('body')).toContainText('All Products');

  const firstProduct = page.locator('.features_items .product-image-wrapper').first();

  await expect(firstProduct).toBeVisible({ timeout: 15000 });
  await firstProduct.scrollIntoViewIfNeeded();
  await firstProduct.hover();

  await firstProduct.getByText('Add to cart').first().click();

  await expect(page.getByText('Added!')).toBeVisible({ timeout: 15000 });

  await page.getByRole('link', { name: 'View Cart' }).click();

  await expect(page).toHaveURL(/view_cart/);

  await page.getByText('Proceed To Checkout').click();

  await expect(page).toHaveURL(/checkout/);
}

test.describe('Logged In Checkout Tests', () => {
  
  test.describe.configure({ mode: 'serial' });
  test.setTimeout(120000);
  test.beforeEach(async ({ page }) => {
    await page.route(/googlesyndication|doubleclick|googleadservices|adservice|pagead/, route =>
      route.abort()
    );
  });

  test('logged in user can open checkout page with cart item', async ({ page }) => {
    await createUser(page);
    await addProductAndGoToCheckout(page);

    await expect(page.locator('body')).toContainText('Checkout');
  });

  test('checkout page shows address details section', async ({ page }) => {
    await createUser(page);
    await addProductAndGoToCheckout(page);

    await expect(page.locator('body')).toContainText('Address Details');
  });

  test('checkout page shows review your order section', async ({ page }) => {
    await createUser(page);
    await addProductAndGoToCheckout(page);

    await expect(page.locator('body')).toContainText('Review Your Order');
  });

  test('checkout page shows order product table', async ({ page }) => {
    await createUser(page);
    await addProductAndGoToCheckout(page);

    await expect(page.locator('tr[id^="product-"]')).toBeVisible();
  });

  test('checkout page allows order comment input', async ({ page }) => {
    await createUser(page);
    await addProductAndGoToCheckout(page);

    const commentBox = page.locator('textarea[name="message"]');

    await expect(commentBox).toBeVisible();
    await commentBox.fill('This is a checkout comment from Playwright test.');

    await expect(commentBox).toHaveValue('This is a checkout comment from Playwright test.');
  });
});