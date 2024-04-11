import { test, expect } from '@playwright/test';
import { WAIT_FOR_SLOW_CPU, PASSWORD } from '../../config/test-config';

const EMAIL = 'playerOne@example.com';

test('Check if user can complet signup process', async ({ page, baseURL }) => {
    const testEmail = `${new Date().getTime()}TestUser@example.com`;

    await page.goto(baseURL + '/login');
    await page.locator('[data-test="set-form-signup"]').click();
    await page.locator('[data-test="signup-email"]').click();
    await page.waitForTimeout(WAIT_FOR_SLOW_CPU);
    await page.keyboard.type(testEmail);
    await page.locator('[data-test="signup-password"]').click();
    await page.waitForTimeout(WAIT_FOR_SLOW_CPU);
    await page.keyboard.type(PASSWORD);
    await page.waitForTimeout(WAIT_FOR_SLOW_CPU);
    await page.keyboard.press('Enter');
    await page.waitForURL('/game/lobby');
    await expect(page.locator('button.v-btn.v-btn--elevated.lobby-game-type-btn')).toBeVisible();
});

test('Check if user can log in', async ({ page, baseURL }) => {
    await page.goto(baseURL + '/login');
    await page.locator('[data-test="login-email"]').click();
    await page.waitForTimeout(WAIT_FOR_SLOW_CPU);
    await page.keyboard.type(EMAIL);
    await page.locator('[data-test="login-password"]').click();
    await page.waitForTimeout(WAIT_FOR_SLOW_CPU);
    await page.keyboard.type(PASSWORD);
    await page.waitForTimeout(WAIT_FOR_SLOW_CPU);
    await page.keyboard.press('Enter');
    await page.waitForURL('/game/lobby');
    await expect(page.locator('button.v-btn.v-btn--elevated.lobby-game-type-btn')).toBeVisible();
});
