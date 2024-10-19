import { test, expect } from '@playwright/test';

const LOGIN_PATH = '/login';
const validEmail = 'employee@example.com';
const validPassword = '@employee2024';
const invalidEmail = 'invalid-email';
const wrongPassword = 'wrongPassword123';

test.describe('Login Screen E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_PATH);
  });

  test('should display validation errors for empty fields', async ({ page }) => {
    await page.click('button:has-text("Login")');
    await expect(page.locator('p:has-text("Email is required")')).toBeVisible();
    await expect(page.locator('p:has-text("Password is required")')).toBeVisible();
  });

  test('should show error for invalid email format', async ({ page }) => {
    await page.fill('input[placeholder="Enter your email"]', invalidEmail);
    await page.fill('input[placeholder="Enter your password"]', validPassword);
    await page.click('button:has-text("Login")');
    await expect(page.locator('p:has-text("Invalid email format")')).toBeVisible();
  });

  test('should successfully log in with valid credentials', async ({ page }) => {
    await page.route('/user/login', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          token: 'mock-token',
          user: { role: 'user' }
        }),
      });
    });
    await page.fill('input[placeholder="Enter your email"]', validEmail);
    await page.fill('input[placeholder="Enter your password"]', validPassword);
    await page.click('button:has-text("Login")');
    await expect(page).toHaveURL('/');
  });

  test('should show error message for incorrect login credentials', async ({ page }) => {
    await page.route('/user/login', route => {
      route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({
          message: 'Invalid email or password'
        }),
      });
    });
    await page.fill('input[placeholder="Enter your email"]', validEmail);
    await page.fill('input[placeholder="Enter your password"]', wrongPassword);
    await page.click('button:has-text("Login")');
    await expect(page.locator('.ant-message')).toHaveText('Invalid email or password');
  });
});
