import { test, expect } from '@playwright/test';

const LOGIN_PATH = '/login';
const ACCOUNT_PATH = '/account';

const validEmail = 'employee@example.com';
const validPassword = '@employee2024';

const mockLoginResponse = {
  token: 'mock-token',
  user: { role: 'user' },
};

test.describe('Edit Profile Flow E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('/user/login', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockLoginResponse),
      });
    });

    await page.goto(LOGIN_PATH);
    await page.fill('input[placeholder="Enter your email"]', validEmail);
    await page.fill('input[placeholder="Enter your password"]', validPassword);
    await page.click('button:has-text("Login")');
    await expect(page).toHaveURL('/');

    await page.route('/user/me', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
      });
    });

    await page.goto(ACCOUNT_PATH);
  });

  test('should display user profile data', async ({ page }) => {
    const nameElement = page.locator('h1 .text-blue-500');
    await expect(nameElement).toBeVisible(); 

    const nameText = await nameElement.textContent();
    await expect(nameText).not.toBeNull();
    await expect(nameText).not.toBe('');

    const roleElement = page.locator('p');
    await expect(roleElement).toBeVisible(); 

    const roleText = await roleElement.textContent();
    await expect(roleText).not.toBeNull();
    await expect(roleText).not.toBe('');

    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="bio"]')).toBeVisible();
});

  test('should update profile successfully', async ({ page }) => {
    await page.route('/user', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Profile updated successfully!' }),
      });
    });

    await page.click('button:has-text("Save Profile")');

    await expect(page.locator('.ant-message')).toHaveText('Profile updated successfully!');
  });

  test('should logout successfully', async ({ page }) => {
    await page.click('button:has-text("Logout")');
    await expect(page).toHaveURL(LOGIN_PATH);
  });
});
