import { readFileSync } from "node:fs";

import { expect, test, type Page } from "@playwright/test";

/**
 * US-012-2 -- Export and import of the local notes store, including the
 * invalid-file path and a full round trip.
 *
 * AC-022: the downloaded file contains every seeded note, its checklist items,
 * and their checked states.
 * AC-023: importing a previously exported file into a browser context whose
 * "notes_v1" storage is empty loads those notes into localStorage and shows
 * them in the list.
 * AC-024: importing a file that is not a notes export shows an error and
 * leaves "notes_v1" byte-unchanged.
 *
 * NFR-005 (CDN delivery for mobile India): not testable from this harness,
 * which serves the build from a local preview server rather than a global
 * CDN. Not blocking this ticket.
 */

const STORAGE_KEY = "notes_v1";

const SEED_NOTES = [
  {
    id: "n-export-a",
    text: "Trip to Lonavala",
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
    items: [
      { id: "i1", text: "Book cab", checked: true, position: 0 },
      { id: "i2", text: "Pack raincoat", checked: false, position: 1 },
    ],
  },
  {
    id: "n-export-b",
    text: "Quarterly review prep",
    created_at: "2026-01-02T00:00:00.000Z",
    updated_at: "2026-01-02T00:00:00.000Z",
    items: [{ id: "i3", text: "Collect metrics", checked: true, position: 0 }],
  },
];

async function seedBeforeLoad(page: Page, notes: unknown[]) {
  await page.addInitScript(
    ({ key, value }) => {
      window.localStorage.setItem(key, JSON.stringify(value));
    },
    { key: STORAGE_KEY, value: notes },
  );
  await page.goto("/backup");
}

async function readStorageKey(page: Page): Promise<string | null> {
  return page.evaluate((key) => window.localStorage.getItem(key), STORAGE_KEY);
}

test.describe("export", () => {
  test("[AC-022] the downloaded file contains every seeded note with its checklist items and checked states", async ({
    page,
  }) => {
    await seedBeforeLoad(page, SEED_NOTES);

    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: /Export notes/ }).click();
    const download = await downloadPromise;

    const path = await download.path();
    expect(path).toBeTruthy();
    const content = readFileSync(path as string, "utf-8");
    const parsed = JSON.parse(content);

    expect(parsed.format).toBe("notes.export");
    expect(parsed.version).toBe(1);
    expect(parsed.notes).toHaveLength(2);

    const byId = new Map((parsed.notes as Array<{ id: string }>).map((n) => [n.id, n]));
    const noteA = byId.get("n-export-a") as {
      text: string;
      items: Array<{ text: string; checked: boolean }>;
    };
    const noteB = byId.get("n-export-b") as {
      text: string;
      items: Array<{ text: string; checked: boolean }>;
    };

    expect(noteA.text).toBe("Trip to Lonavala");
    expect(noteA.items.map((i) => ({ text: i.text, checked: i.checked }))).toEqual([
      { text: "Book cab", checked: true },
      { text: "Pack raincoat", checked: false },
    ]);
    expect(noteB.text).toBe("Quarterly review prep");
    expect(noteB.items.map((i) => ({ text: i.text, checked: i.checked }))).toEqual([
      { text: "Collect metrics", checked: true },
    ]);
  });
});

test.describe("import round trip", () => {
  test("[AC-023] importing a previously exported file into an empty context loads the notes into localStorage and the list", async ({
    page,
    browser,
  }) => {
    await seedBeforeLoad(page, SEED_NOTES);

    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: /Export notes/ }).click();
    const download = await downloadPromise;
    const path = await download.path();
    const exportedContent = readFileSync(path as string, "utf-8");

    // A fresh context: clean, empty storage -- a different browser profile entirely.
    const freshContext = await browser.newContext();
    const freshPage = await freshContext.newPage();
    await freshPage.goto("/backup");
    expect(await readStorageKey(freshPage)).toBeNull();

    const fileInput = freshPage.getByLabel(/Choose a previously exported file/i);
    await fileInput.setInputFiles({
      name: "notes-backup.json",
      mimeType: "application/json",
      buffer: Buffer.from(exportedContent, "utf-8"),
    });
    await freshPage.getByRole("button", { name: /Import notes/ }).click();
    await expect(freshPage.getByRole("status")).toContainText(/Imported/i);

    const raw = await readStorageKey(freshPage);
    expect(raw).not.toBeNull();
    const stored = JSON.parse(raw as string) as Array<{ id: string; text: string }>;
    expect(stored.map((n) => n.id).sort()).toEqual(["n-export-a", "n-export-b"]);

    await freshPage.goto("/notes");
    await expect(freshPage.getByText("Trip to Lonavala")).toBeVisible();
    await expect(freshPage.getByText("Quarterly review prep")).toBeVisible();

    await freshContext.close();
  });
});

test.describe("invalid import file", () => {
  test("[AC-024] importing a non-export file shows an error and leaves notes_v1 unchanged", async ({
    page,
  }) => {
    await seedBeforeLoad(page, SEED_NOTES);
    const before = await readStorageKey(page);
    expect(before).not.toBeNull();

    const fileInput = page.getByLabel(/Choose a previously exported file/i);
    await fileInput.setInputFiles({
      name: "random.json",
      mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify({ hello: "world" }), "utf-8"),
    });
    await page.getByRole("button", { name: /Import notes/ }).click();

    await expect(page.getByRole("alert")).toContainText(/not a valid Notes export/i);

    const after = await readStorageKey(page);
    expect(after).toBe(before);

    // Navigating to the list confirms nothing was imported and the seeded notes remain.
    await page.goto("/notes");
    await expect(page.getByText("Trip to Lonavala")).toBeVisible();
    await expect(page.getByText("Quarterly review prep")).toBeVisible();
  });

  test("[AC-024] importing a non-JSON file shows an error and leaves notes_v1 unchanged", async ({
    page,
  }) => {
    await seedBeforeLoad(page, SEED_NOTES);
    const before = await readStorageKey(page);

    const fileInput = page.getByLabel(/Choose a previously exported file/i);
    await fileInput.setInputFiles({
      name: "not-json.txt",
      mimeType: "text/plain",
      buffer: Buffer.from("this is not json at all", "utf-8"),
    });
    await page.getByRole("button", { name: /Import notes/ }).click();

    await expect(page.getByRole("alert")).toContainText(/not a valid/i);
    expect(await readStorageKey(page)).toBe(before);
  });
});
