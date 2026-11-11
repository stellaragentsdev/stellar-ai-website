import { test, expect } from '@playwright/test';

test('keyboard navigation and contact form submit', async ({ page }) => {
  // Navigate to local dev server
  await page.goto('http://localhost:3000/');

  // Basic page sanity
  await expect(page).toHaveTitle(/Stellar Agents/i);

  // Tabbing through the page a few times to exercise keyboard navigation
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab');
    await page.waitForTimeout(50);
  }

  // Fill the visible contact form fields by label
  await page.getByLabel('Full name').fill('Smoke Tester');
  await page.getByLabel('Work email').fill('smoke@example.com');
  await page.getByLabel('What are you trying to solve?').fill('Automated smoke test submission');

  // Focus the submit button and activate it with keyboard (Enter)
  const submit = page.getByRole('button', { name: /Request a consultation|Request a demo|Submit|Request a consultation/i });
  await submit.focus();
  await page.keyboard.press('Enter');

  // Wait for success state shown by the ContactForm component
  await expect(page.getByText('Enquiry received')).toBeVisible({ timeout: 10000 });
});
