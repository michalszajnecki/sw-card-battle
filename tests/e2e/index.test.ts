import { test, expect } from '@playwright/test';

test('Check if content of index page is visible', async ({ page, baseURL }) => {
    await page.goto(baseURL + '/');
    await expect(page.locator('h1.welcome-header')).toBeVisible();
    await expect(page.locator('p.welcome-intro')).toBeVisible();
    await expect(page.locator('div.cta-container')).toBeVisible();
    await expect(page.locator('p.legal-stuff')).toBeVisible();
});

test('Check if user can go to login page from index page', async ({ page, baseURL }) => {
    await page.goto(baseURL + '/');
    await page.locator('a.welcome-cta').click();
    await expect(page.locator('h1.welcome-header')).toBeVisible();
    await expect(page.locator('h1.welcome-header')).toHaveText("Let's play!");
});
