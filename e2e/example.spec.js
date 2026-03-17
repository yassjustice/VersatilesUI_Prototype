import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  const resp = await page.goto('/');
  // Ensure the server responded and the page rendered
  expect(resp && resp.ok()).toBeTruthy();
  await expect(page.locator('body')).toBeVisible();
});
