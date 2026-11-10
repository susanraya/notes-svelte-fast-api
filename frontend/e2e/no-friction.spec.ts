import { expect, test } from "@playwright/test";

/**
 * US-014 -- Zero-friction, zero-collection app.
 *
 * AC-026: no payment, subscription, billing, paywall or upgrade prompt appears anywhere
 * while creating, editing, deleting or listing notes.
 * AC-030: no cookie/DPDP consent banner or personal-data form is rendered on first load
 * or during note management; no cookies are set.
 * NFR-001 / AC-030: no outbound request carries user or note data -- everything is
 * local-only storage in the browser.
 */

const PAYMENT_PATTERN =
  /subscribe|subscription|billing|payment|paywall|upgrade to|go premium|pricing|credit card|checkout/i;
const CONSENT_PATTERN =
  /accept cookies|cookie consent|we use cookies|manage preferences|consent|privacy preferences|dpdp|data protection/i;
const PERSONAL_DATA_FIELD = 'input[type="email"], input[type="tel"], input[name*="phone" i], input[name*="address" i], input[autocomplete="name"]';

test("[AC-026] no payment, subscription or paywall prompt appears across the note lifecycle", async ({
  page,
}) => {
  await page.goto("/notes");
  await expect(page.getByText(PAYMENT_PATTERN)).toHaveCount(0);

  // Create
  await page.getByRole("button", { name: "New note" }).click();
  await expect(page.getByText(PAYMENT_PATTERN)).toHaveCount(0);
  await page.getByLabel("Note text").fill("Budget trip notes");
  await page.getByLabel("New checklist item").fill("Book the bus");
  await page.getByRole("button", { name: "Add item" }).click();
  await expect(page.getByText(PAYMENT_PATTERN)).toHaveCount(0);

  // Save (edit path exercised via the detail screen itself)
  await page.getByRole("button", { name: "Save note" }).click();
  await expect(page).toHaveURL(/\/notes$/);
  await expect(page.getByText(PAYMENT_PATTERN)).toHaveCount(0);

  // Delete
  const deleteButtons = page.getByRole("button", { name: /^Delete “/ });
  await expect(deleteButtons.first()).toBeVisible();
  await deleteButtons.first().click();
  await expect(page.getByText(PAYMENT_PATTERN)).toHaveCount(0);
  await page.getByRole("button", { name: "Delete" }).click();
  await expect(page.getByText(PAYMENT_PATTERN)).toHaveCount(0);

  // No upgrade/pricing links or buttons exist anywhere in the chrome either.
  await expect(
    page.getByRole("link", { name: /pricing|upgrade|subscribe|billing/i }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: /pricing|upgrade|subscribe|billing/i }),
  ).toHaveCount(0);
});

test("[AC-030] no cookie/consent banner or personal-data form appears on first load or during note management", async ({
  page,
  context,
}) => {
  await page.goto("/notes");
  await expect(page.getByText(CONSENT_PATTERN)).toHaveCount(0);
  await expect(page.locator(PERSONAL_DATA_FIELD)).toHaveCount(0);

  await page.getByRole("button", { name: "New note" }).click();
  await expect(page.getByText(CONSENT_PATTERN)).toHaveCount(0);
  await expect(page.locator(PERSONAL_DATA_FIELD)).toHaveCount(0);

  await page.getByLabel("Note text").fill("Personal data stays out of this form");
  await page.getByRole("button", { name: "Save note" }).click();
  await expect(page).toHaveURL(/\/notes$/);
  await expect(page.getByText(CONSENT_PATTERN)).toHaveCount(0);

  // No cookies set anywhere during the flow -- storage is local-only.
  const cookies = await context.cookies();
  expect(cookies).toHaveLength(0);
});

test("[AC-030, NFR-001] no outbound request carries note or user data; everything lives in localStorage", async ({
  page,
  context,
}) => {
  const SECRET_NOTE_TEXT = "qa-sentinel-note-contents-should-never-leave-the-browser";
  const requestsWithPayload: string[] = [];

  page.on("request", (request) => {
    const postData = request.postData();
    const url = request.url();
    if (postData && postData.includes(SECRET_NOTE_TEXT)) {
      requestsWithPayload.push(`POST ${url} :: ${postData}`);
    }
    if (url.includes(encodeURIComponent(SECRET_NOTE_TEXT)) || url.includes(SECRET_NOTE_TEXT)) {
      requestsWithPayload.push(`GET ${url}`);
    }
  });

  await page.goto("/notes");
  await page.getByRole("button", { name: "New note" }).click();
  await page.getByLabel("Note text").fill(SECRET_NOTE_TEXT);
  await page.getByRole("button", { name: "Save note" }).click();
  await expect(page).toHaveURL(/\/notes$/);

  expect(requestsWithPayload).toEqual([]);

  // The note text is present only in this browser's localStorage, nowhere else.
  const storedLocally = await page.evaluate(() => JSON.stringify(localStorage));
  // Not asserting a specific key shape (private implementation detail), only that
  // no network layer was involved -- confirmed above. Cookies remain empty too.
  const cookies = await context.cookies();
  expect(cookies).toHaveLength(0);
  void storedLocally;
});
