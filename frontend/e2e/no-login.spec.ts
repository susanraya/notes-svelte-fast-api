import { expect, test } from "@playwright/test";

/**
 * US-014 -- Use the app with no login or account.
 *
 * AC-025: Given a visitor opens the app for the first time, when the app loads, then
 * they can create and manage notes immediately without being asked to register, log in,
 * or provide any personal details.
 *
 * There are no note CRUD endpoints by design (notes live only in the browser's local
 * storage), so this criterion is proved end to end through the browser, the way a
 * first-time visitor actually experiences it -- no `request` spec applies here.
 */

test("[AC-025] a first-time visitor lands on a usable app with no sign-up, login, or personal details", async ({
  page,
}) => {
  const response = await page.goto("/");
  expect(response?.ok()).toBeTruthy();

  // Lands directly on the notes screen -- no redirect to a login or register screen.
  await expect(page).toHaveURL(/\/notes$/);
  await expect(page.getByRole("heading", { name: "Notes" })).toBeVisible();

  // Nothing on the landing screen asks for credentials or personal details.
  await expect(page.locator('input[type="email"], input[type="password"]')).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: /sign in|log in|register|sign up/i }),
  ).toHaveCount(0);
  await expect(page.getByRole("link", { name: /sign in|log in|register|sign up/i })).toHaveCount(
    0,
  );

  // No session/auth token exists -- nothing was required to reach this screen.
  const sessionToken = await page.evaluate(() => localStorage.getItem("session_token"));
  expect(sessionToken).toBeNull();
});

test("[AC-025] a first-time visitor creates and manages a note immediately, with no account step", async ({
  page,
}) => {
  await page.goto("/notes");

  // Create: the primary action works at once, no interstitial of any kind.
  await page.getByRole("button", { name: "New note" }).click();
  await expect(page).toHaveURL(/\/note-detail$/);
  await expect(page.getByRole("heading", { name: "Note", exact: true })).toBeVisible();

  await page.getByLabel("Note text").fill("Pick up the dry cleaning\nBefore the shop shuts at 7.");
  await page.getByLabel("New checklist item").fill("Collect the blue shirt");
  await page.getByRole("button", { name: "Add item" }).click();
  await expect(page.getByText("Collect the blue shirt")).toBeVisible();

  // Still nothing asking for a password or an email anywhere on this screen either.
  await expect(page.locator('input[type="email"], input[type="password"]')).toHaveCount(0);

  await page.getByRole("button", { name: "Save note" }).click();
  await expect(page).toHaveURL(/\/notes$/);

  // Manage: deleting an existing note works immediately too, no account required.
  const deleteButtons = page.getByRole("button", { name: /^Delete “/ });
  await expect(deleteButtons.first()).toBeVisible();
  await deleteButtons.first().click();
  await page.getByRole("button", { name: "Delete" }).click();
  await expect(page.getByText(/Deleted “/)).toBeVisible();

  // Reaching the Backup & About screen required no sign-in either.
  await page.getByRole("link", { name: /backup/i }).click();
  await expect(page).toHaveURL(/\/backup$/);
  await expect(page.locator('input[type="email"], input[type="password"]')).toHaveCount(0);
});
