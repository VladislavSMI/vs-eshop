import { test as it, expect } from '@playwright/test';

it.beforeEach(async () => {
  process.env.MOCK_DB = 'true';
});

it.afterEach(async () => {
  process.env.MOCK_DB = 'false';
});

it('handles i18n routing and shows correct content for footer', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page).toHaveURL('/en');

  await page.goto('/nl');
  await page.goto('/');
  await expect(page).toHaveURL('/nl');

  await page.goto('/en');
  await expect(page).toHaveURL('/en');
  await expect(page.locator('footer')).toContainText('About Us');
  await page.goto('/nl');
  await expect(page).toHaveURL('/nl');
  await expect(page.locator('footer')).toContainText('Over ons');
});

it('handles not found pages', async ({ page }) => {
  await page.goto('/unknown');
  await expect(
    page.getByRole('heading', { name: 'Page Not Found' }),
  ).toBeVisible();

  await page.goto('/nl/unknown');
  await expect(
    page.getByRole('heading', { name: 'Pagina Niet Gevonden' }),
  ).toBeVisible();
});

it("handles not found pages for routes that don't match the middleware", async ({
  page,
}) => {
  await page.goto('/test.png');
  await expect(
    page.getByRole('heading', { name: 'This page could not be found.' }),
  ).toBeVisible();

  await page.goto('/api/hello');
  await expect(
    page.getByRole('heading', { name: 'This page could not be found.' }),
  ).toBeVisible();
});

it('sets caching headers for static pages', async ({ request }) => {
  for (const pathname of [
    '/en/about-us',
    '/en/privacy-policy',
    '/en/shipping-return-policy',
    '/en/terms-conditions',
    '/nl/about-us',
    '/nl/privacy-policy',
    '/nl/shipping-return-policy',
    '/nl/terms-conditions',
  ]) {
    const response = await request.get(pathname);
    expect(response.headers()['cache-control']).toBe(
      's-maxage=31536000, stale-while-revalidate',
    );
  }
});

it('can be used to configure metadata', async ({ page }) => {
  await page.goto('/en');
  await expect(page).toHaveTitle('VS Skate Shop');

  await page.goto('/nl');
  await expect(page).toHaveTitle('VS Skate Winkel');
});

it('sets a cookie', async ({ page }) => {
  const response = await page.goto('/en');
  const value = await response?.headerValue('set-cookie');
  expect(value).toContain('NEXT_LOCALE=en;');
  expect(value).toContain('Path=/;');
  expect(value).toContain('SameSite=lax');
  expect(value).toContain('Expires=');

  await page.getByRole('button', { name: 'Change language dropdown' }).click();
  await page.getByRole('button', { name: 'Change language nl' }).click();

  await expect(page).toHaveURL('/nl');

  await page.getByRole('button', { name: 'Change language dropdown' }).click();
  await page.getByRole('button', { name: 'Change language en' }).click();

  await expect(page).toHaveURL('/en');
});

it('serves a robots.txt', async ({ page }) => {
  const response = await page.goto('/robots.txt');
  const body = await response?.text();
  expect(body).toContain('User-agent: *');
  expect(body).toContain('Disallow: /dashboard');
});

it('provides a manifest', async ({ page }) => {
  // Intercept the request to /favicon/site.webmanifest
  await page.route('**/favicon/site.webmanifest', async (route) => {
    const response = await route.fetch();
    const json = await response.json();
    await route.fulfill({ response });

    expect(json).toMatchObject({
      name: 'VS skate shop',
      short_name: 'VS',
      icons: [
        {
          src: '/favicon/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/favicon/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
      theme_color: '#1f2937',
    });
  });

  await page.goto('/');
});
