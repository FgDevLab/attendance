import { test, expect } from '@playwright/test';

const LOGIN_PATH = '/login';
const CLOCKIN_PATH = '/clockin';

const validEmail = 'employee@example.com';
const validPassword = '@employee2024';

test.describe('Clock In Flow E2E Tests', () => {
  let context;
  
  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext({
      permissions: ['camera', 'geolocation'],
    });
    const page = await context.newPage();
    
    await page.route('/user/login', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
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
        contentType: 'application/json'
      });
    });

    await page.goto(CLOCKIN_PATH);
  });

  test('should successfully clock in with image capture', async () => {
    const page = context.pages()[0];

    await expect(page.locator('video')).toBeVisible();

    await page.click('button:has-text("Clock In")');
    await page.waitForTimeout(1000);

    await expect(page.locator('text=Confirm Clock In')).toBeVisible();
    await page.click('text=Yes, Clock In');

    await expect(page).toHaveURL('/');
  });

  test.afterEach(async () => {
    await context.close(); 
  });
});
