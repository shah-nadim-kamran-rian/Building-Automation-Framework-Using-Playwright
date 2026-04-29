const { test, expect } = require('@playwright/test');

test.describe('Negative API Tests', () => {
  test('POST request to productsList API returns method not supported message', async ({ request }) => {
    const response = await request.post('https://automationexercise.com/api/productsList');

    expect(response.status()).toBe(200);

    const body = await response.text();

    expect(body).toContain('405');
    expect(body).toContain('This request method is not supported.');
  });

  test('PUT request to brandsList API returns method not supported message', async ({ request }) => {
    const response = await request.put('https://automationexercise.com/api/brandsList');

    expect(response.status()).toBe(200);

    const body = await response.text();

    expect(body).toContain('405');
    expect(body).toContain('This request method is not supported.');
  });

  test('searchProduct API without search parameter returns bad request message', async ({ request }) => {
    const response = await request.post('https://automationexercise.com/api/searchProduct');

    expect(response.status()).toBe(200);

    const body = await response.text();

    expect(body).toContain('400');
    expect(body).toContain('Bad request');
  });

  test('verifyLogin API without parameters returns bad request message', async ({ request }) => {
    const response = await request.post('https://automationexercise.com/api/verifyLogin');

    expect(response.status()).toBe(200);

    const body = await response.text();

    expect(body).toContain('400');
    expect(body).toContain('Bad request');
  });

  test('verifyLogin API with invalid credentials returns user not found message', async ({ request }) => {
    const response = await request.post('https://automationexercise.com/api/verifyLogin', {
      form: {
        email: `invalid_${Date.now()}@test.com`,
        password: 'wrongpassword'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.text();

    expect(body).toContain('404');
    expect(body).toContain('User not found');
  });
});