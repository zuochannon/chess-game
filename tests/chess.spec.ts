import { test, expect } from '@playwright/test';

test('successful login', async ({ page }) => {
    await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle' });
    const emailInput = page.locator('input[name="email"]');
    const passwordInput = page.locator('input[name="password"]');
    const loginButton = page.locator('text=Login');

    if (await emailInput.isVisible() && await passwordInput.isVisible()) {
        await emailInput.fill('user@example.com');
        await passwordInput.fill('password123');
        await loginButton.click();
        await expect(page).toHaveURL('http://localhost:3000/dashboard');
    } else {
        console.error("Login elements not visible!");
        await page.screenshot({ path: `error-${Date.now()}.png` });
    }
});