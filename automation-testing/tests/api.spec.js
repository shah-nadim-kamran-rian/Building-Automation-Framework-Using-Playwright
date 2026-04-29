const { test, expect } = require('@playwright/test');

test.describe('API Tests', () => {
  test('get all products API should return 200', async ({ request }) => {
    const response = await request.get('https://automationexercise.com/api/productsList');

    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain('products');
  });

  test('get all brands API should return 200', async ({ request }) => {
    const response = await request.get('https://automationexercise.com/api/brandsList');

    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain('brands');
  });

  test('search product API should return matching response', async ({ request }) => {
    const response = await request.post('https://automationexercise.com/api/searchProduct', {
      form: {
        search_product: 'dress'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain('products');
  });
});