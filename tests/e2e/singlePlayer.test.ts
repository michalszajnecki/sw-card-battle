import { test } from '@playwright/test';
import { WAIT_FOR_SLOW_CPU, PASSWORD } from '../../config/test-config';

const EMAIL = 'playerTwo@example.com';

test('Check if user can log in and finish quick match against PC', async ({ page, baseURL }) => {
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
    await page.locator('button.v-btn.v-btn--elevated.lobby-game-type-btn').click();
    await page.waitForTimeout(WAIT_FOR_SLOW_CPU);
    await page.locator('[data-test="single-player-dialog-resource-people"]').click();
    await page.waitForTimeout(WAIT_FOR_SLOW_CPU);
    await page.waitForURL('/game/singlePlayerRoom');
    await page.waitForTimeout(WAIT_FOR_SLOW_CPU);
    await page.locator('.card.card--player.card-0').click();
    await page.waitForTimeout(WAIT_FOR_SLOW_CPU);
    await page.locator('[data-test="leave-room"]').click();
    await page.waitForTimeout(WAIT_FOR_SLOW_CPU);
    await page.waitForURL('/game/lobby');
});

test('Check if user can log in and finish full match against PC', async ({ page, baseURL }) => {
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
    await page.locator('button.v-btn.v-btn--elevated.lobby-game-type-btn').click();
    await page.waitForTimeout(WAIT_FOR_SLOW_CPU);
    await page.locator('[data-test="single-player-dialog-resource-people"]').click();
    await page.waitForTimeout(WAIT_FOR_SLOW_CPU);
    await page.waitForURL('/game/singlePlayerRoom');
    await page.waitForTimeout(WAIT_FOR_SLOW_CPU);
    await page.locator('.card.card--player.card-0').click();
    await page.waitForTimeout(WAIT_FOR_SLOW_CPU);
    await page.locator('[data-test="play-again"]').click();
    await page.waitForTimeout(WAIT_FOR_SLOW_CPU);
    await page.locator('.card.card--player.card-1').click();
    await page.waitForTimeout(WAIT_FOR_SLOW_CPU);
    await page.locator('[data-test="play-again"]').click();
    await page.waitForTimeout(WAIT_FOR_SLOW_CPU);
    await page.locator('.card.card--player.card-2').click();
    await page.waitForTimeout(WAIT_FOR_SLOW_CPU);
    await page.locator('[data-test="play-again"]').click();
    await page.waitForTimeout(WAIT_FOR_SLOW_CPU);
    await page.locator('.card.card--player.card-3').click();
    await page.waitForTimeout(WAIT_FOR_SLOW_CPU);
    await page.locator('[data-test="play-again"]').click();
    await page.waitForTimeout(WAIT_FOR_SLOW_CPU);
    await page.locator('.card.card--player.card-4').click();
    await page.waitForTimeout(WAIT_FOR_SLOW_CPU);
    await page.locator('[data-test="leave-room"]').click();
    await page.waitForTimeout(WAIT_FOR_SLOW_CPU);
    await page.waitForURL('/game/lobby');
});
