import { expect, test, type Page } from "@playwright/test";

/**
 * US-010-2 -- Offline operation and single-browser isolation of notes.
 *
 * AC-020: after the app has loaded once online, the browser context goes offline and
 * create, view, edit, delete and checklist toggle all keep working, backed only by
 * localStorage (NFR-002).
 * AC-021: a second, fresh browser context (clean storage) sees none of the notes
 * created in the first context, and offers no sync/share affordance -- notes never
 * leave the browser they were created in.
 *
 * NFR-005 (CDN delivery for mobile India): not testable from this harness, which
 * serves the production build from a local `vite preview` server, not a global CDN.
 * Noted, not blocking.
 */

async function waitForServiceWorkerControl(page: Page) {
  // The SW is registered from main.ts after mount, so the very first load is not yet
  // controlled. A reload lets the now-registered worker take control of the page --
  // required for an offline reload to be served from the precache afterwards.
  await page.goto("/notes");
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  await page.waitForFunction(() => Boolean(navigator.serviceWorker.controller), {
    timeout: 30_000,
  });
}

test.describe("offline CRUD and checklist", () => {
  test("[AC-020, NFR-002] create, view, edit, delete and checklist toggle all work with the browser context offline", async ({
    page,
    context,
  }) => {
    await waitForServiceWorkerControl(page);

    await context.setOffline(true);

    // Create, offline.
    await page.getByRole("button", { name: "New note" }).click();
    await page.getByLabel("Note text").fill("Offline grocery run");
    await page.getByLabel("New checklist item").fill("Buy rice");
    await page.getByRole("button", { name: "Add item" }).click();
    await page.getByRole("button", { name: "Save note" }).click();
    await expect(page).toHaveURL(/\/notes$/);
    await expect(page.getByText("Offline grocery run")).toBeVisible();

    // View, offline.
    await page.getByText("Offline grocery run", { exact: true }).click();
    await expect(page.getByLabel("Note text")).toHaveValue("Offline grocery run");
    await expect(page.getByText("Buy rice")).toBeVisible();

    // Checklist toggle, offline.
    const checkbox = page.getByRole("checkbox", { name: /Buy rice/ });
    await expect(checkbox).not.toBeChecked();
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    // Edit, offline.
    await page.getByLabel("Note text").fill("Offline grocery run — updated while offline");
    await page.getByRole("button", { name: "Save note" }).click();
    await expect(page).toHaveURL(/\/notes$/);
    await expect(page.getByText("Offline grocery run — updated while offline")).toBeVisible();

    // Delete, offline.
    const deleteButtons = page.getByRole("button", { name: /^Delete “/ });
    await expect(deleteButtons.first()).toBeVisible();
    await deleteButtons.first().click();
    await page.getByRole("button", { name: "Delete" }).click();
    await expect(page.getByText("Offline grocery run — updated while offline")).toHaveCount(0);

    await context.setOffline(false);
  });
});

test.describe("service worker and offline reload", () => {
  test("[AC-020] the service worker registers after load, and the app shell reloads successfully while offline", async ({
    page,
    context,
  }) => {
    await waitForServiceWorkerControl(page);

    const registrations = await page.evaluate(async () => {
      const regs = await navigator.serviceWorker.getRegistrations();
      return regs.length;
    });
    expect(registrations).toBeGreaterThan(0);

    await context.setOffline(true);

    const response = await page.reload();
    expect(response?.ok()).toBeTruthy();
    await expect(page.getByRole("heading", { name: "Notes" })).toBeVisible();

    await context.setOffline(false);
  });
});

test.describe("single-browser isolation", () => {
  test("[AC-021] a fresh browser context shows none of another context's notes, and no sync/share affordance exists", async ({
    browser,
  }) => {
    const contextA = await browser.newContext();
    const pageA = await contextA.newPage();
    await pageA.goto("/notes");
    await pageA.getByRole("button", { name: "New note" }).click();
    await pageA.getByLabel("Note text").fill("Only visible in context A");
    await pageA.getByRole("button", { name: "Save note" }).click();
    await expect(pageA).toHaveURL(/\/notes$/);
    await expect(pageA.getByText("Only visible in context A")).toBeVisible();

    const contextB = await browser.newContext();
    const pageB = await contextB.newPage();
    await pageB.goto("/notes");

    // The fresh context's clean storage shows no notes from context A.
    await expect(pageB.getByText("Only visible in context A")).toHaveCount(0);
    await expect(pageB.getByText(/no notes yet/i)).toBeVisible();

    // No sync/share affordance exists anywhere in the chrome, in either context.
    const SYNC_SHARE_PATTERN = /sync|share|invite|collaborat|export to|send to|connect account/i;
    await expect(pageA.getByRole("button", { name: SYNC_SHARE_PATTERN })).toHaveCount(0);
    await expect(pageA.getByRole("link", { name: SYNC_SHARE_PATTERN })).toHaveCount(0);
    await expect(pageB.getByRole("button", { name: SYNC_SHARE_PATTERN })).toHaveCount(0);
    await expect(pageB.getByRole("link", { name: SYNC_SHARE_PATTERN })).toHaveCount(0);

    await contextA.close();
    await contextB.close();
  });
});

test.describe("no network transport for note data", () => {
  test("[AC-020] route interception records zero note-carrying requests across a full create, edit and delete flow", async ({
    page,
  }) => {
    const SENTINEL = "offline-isolation-sentinel-note-body-value";
    const noteCarryingRequests: string[] = [];

    await page.route("**/*", async (route) => {
      const request = route.request();
      const postData = request.postData();
      const url = request.url();
      if (
        (postData && postData.includes(SENTINEL)) ||
        url.includes(SENTINEL) ||
        url.includes(encodeURIComponent(SENTINEL))
      ) {
        noteCarryingRequests.push(`${request.method()} ${url} :: ${postData ?? ""}`);
      }
      await route.continue();
    });

    await page.goto("/notes");

    // Create
    await page.getByRole("button", { name: "New note" }).click();
    await page.getByLabel("Note text").fill(SENTINEL);
    await page.getByRole("button", { name: "Save note" }).click();
    await expect(page).toHaveURL(/\/notes$/);

    // Edit
    await page.getByText(SENTINEL).first().click();
    await page.getByLabel("Note text").fill(SENTINEL + " edited");
    await page.getByRole("button", { name: "Save note" }).click();
    await expect(page).toHaveURL(/\/notes$/);

    // Delete
    const deleteButtons = page.getByRole("button", { name: /^Delete “/ });
    await expect(deleteButtons.first()).toBeVisible();
    await deleteButtons.first().click();
    await page.getByRole("button", { name: "Delete" }).click();

    expect(noteCarryingRequests).toEqual([]);
  });
});
