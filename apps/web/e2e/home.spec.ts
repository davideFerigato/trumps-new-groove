import { test, expect } from '@playwright/test';

test('home page loads and button changes phrase', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText("Trump's New Groove");
  const phraseBefore = await page.locator('blockquote').textContent();
  await page.click('button[aria-label="Invoke a new Trump prophecy"]');
  // Aspetta che la frase cambi (più tempo per la risposta API)
  await expect(page.locator('blockquote')).not.toHaveText(phraseBefore || '', { timeout: 10000 });
});