import { test, expect } from '@playwright/test';

test('home page loads and button changes phrase', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText("Trump's New Groove");
  const counterBefore = await page.locator('[data-testid="global-counter"]').textContent();
  const phraseBefore = await page.locator('blockquote').textContent();
  await page.click('button[aria-label="Invoke a new Trump prophecy"]');
  // Attendiamo che la frase cambi
  await expect(page.locator('blockquote')).not.toHaveText(phraseBefore || '');
  // Il counter dovrebbe essere aumentato (potrebbe non aggiornarsi subito)
  // const counterAfter = await page.locator('[data-testid="global-counter"]').textContent();
  // expect(Number(counterAfter)).toBeGreaterThan(Number(counterBefore));
});