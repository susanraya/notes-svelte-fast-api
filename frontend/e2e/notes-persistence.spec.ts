import { expect, test, type Page } from "@playwright/test";

/**
 * US-009-4 -- Note creation, checklists, newest-first list and browser-local persistence.
 *
 * All assertions exercise the real flow (type into the form, click the real buttons)
 * and, where the UI does not expose a detail directly, also read the "notes_v1"
 * localStorage key documented in frontend/src/lib/notes.ts -- this is still an
 * end-to-end check: it reads what the browser actually persisted after the UI
 * interaction, not a mock.
 *
 * NFR-001 (privacy, no data leaves the browser): covered directly by the network-recording
 * test below (AC-019) -- the same mechanism proves both.
 * NFR-005 (performance, CDN delivery for mobile India): not testable from this harness,
 * which serves the build from a local preview server, not a CDN. Not blocking this ticket.
 */

const STORAGE_KEY = "notes_v1";

async function clearNotes(page: Page) {
  await page.goto("/notes");
  await page.evaluate((key) => localStorage.removeItem(key), STORAGE_KEY);
  await page.reload();
}

async function readNotes(page: Page): Promise<Array<Record<string, unknown>>> {
  return page.evaluate((key) => {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  }, STORAGE_KEY);
}

async function seedNotes(page: Page, notes: unknown[]) {
  await page.goto("/notes");
  await page.evaluate(({ key, value }) => localStorage.setItem(key, JSON.stringify(value)), {
    key: STORAGE_KEY,
    value: notes,
  });
  await page.reload();
}

test.describe("note creation and plain text", () => {
  test("[AC-001] creates a note with plain text and the saved note contains exactly that text", async ({
    page,
  }) => {
    await clearNotes(page);
    const TEXT = "Call the plumber tomorrow at 9am about the kitchen tap.";

    await page.getByRole("button", { name: "New note" }).click();
    await page.getByLabel("Note text").fill(TEXT);
    await page.getByRole("button", { name: "Save note" }).click();
    await expect(page).toHaveURL(/\/notes$/);

    const notes = await readNotes(page);
    expect(notes).toHaveLength(1);
    expect(notes[0].text).toBe(TEXT);
  });

  test("[AC-002] saving an empty note leaves the list usable with no broken entry", async ({
    page,
  }) => {
    await clearNotes(page);

    await page.getByRole("button", { name: "New note" }).click();
    await page.getByLabel("Note text").fill("");
    await page.getByRole("button", { name: "Save note" }).click();
    await expect(page).toHaveURL(/\/notes$/);

    const notes = await readNotes(page);
    expect(notes).toHaveLength(0);

    // The list remains usable: the primary action still works, and nothing broken renders.
    await expect(page.getByRole("button", { name: "New note" })).toBeVisible();
    await expect(page.getByText(/undefined|\[object Object\]|NaN/)).toHaveCount(0);
  });
});

test.describe("checklist items", () => {
  test("[AC-003, AC-004] checklist items persist in insertion order, and adding another item leaves existing items unchanged", async ({
    page,
  }) => {
    await clearNotes(page);
    const TITLE = "Shopping list for the week";

    await page.getByRole("button", { name: "New note" }).click();
    await page.getByLabel("Note text").fill(TITLE);

    for (const text of ["Milk", "Eggs", "Bread"]) {
      await page.getByLabel("New checklist item").fill(text);
      await page.getByRole("button", { name: "Add item" }).click();
    }
    await page.getByRole("button", { name: "Save note" }).click();
    await expect(page).toHaveURL(/\/notes$/);

    let notes = await readNotes(page);
    expect(notes).toHaveLength(1);
    expect(notes[0].items.map((i: { text: string }) => i.text)).toEqual(["Milk", "Eggs", "Bread"]);
    const before = notes[0].items;

    // Reopen and add a fourth item -- the first three must stay exactly as they were.
    await page.getByText(TITLE, { exact: true }).click();
    await page.getByLabel("New checklist item").fill("Butter");
    await page.getByRole("button", { name: "Add item" }).click();
    await page.getByRole("button", { name: "Save note" }).click();
    await expect(page).toHaveURL(/\/notes$/);

    notes = await readNotes(page);
    expect(notes).toHaveLength(1);
    const after = notes[0].items;
    expect(after.map((i: { text: string }) => i.text)).toEqual(["Milk", "Eggs", "Bread", "Butter"]);
    expect(
      after.slice(0, 3).map((i: { text: string; checked: boolean }) => ({
        text: i.text,
        checked: i.checked,
      })),
    ).toEqual(
      before.map((i: { text: string; checked: boolean }) => ({
        text: i.text,
        checked: i.checked,
      })),
    );
  });
});

test.describe("newest-first list and empty state", () => {
  test("[AC-007, AC-008] the list shows all notes newest first, and a newly created note is at the top", async ({
    page,
  }) => {
    await seedNotes(page, [
      {
        id: "n-old",
        text: "Older note",
        created_at: "2026-01-01T00:00:00.000Z",
        updated_at: "2026-01-01T00:00:00.000Z",
        items: [],
      },
      {
        id: "n-new",
        text: "Newer note",
        created_at: "2026-01-02T00:00:00.000Z",
        updated_at: "2026-01-02T00:00:00.000Z",
        items: [],
      },
    ]);

    let rows = page.locator("ol > li");
    await expect(rows.first()).toContainText("Newer note");

    await page.getByRole("button", { name: "New note" }).click();
    await page.getByLabel("Note text").fill("Brand new top note");
    await page.getByRole("button", { name: "Save note" }).click();
    await expect(page).toHaveURL(/\/notes$/);

    rows = page.locator("ol > li");
    await expect(rows.first()).toContainText("Brand new top note");
  });

  test("[AC-009] shows the empty state message when localStorage holds no notes", async ({
    page,
  }) => {
    await clearNotes(page);
    await expect(page.getByText(/no notes yet/i)).toBeVisible();
  });
});

test.describe("note detail and persistence across reload", () => {
  test("[AC-010] opens a note and shows its full text and every checklist item with its checked state", async ({
    page,
  }) => {
    const FULL_TEXT = "Weekend plan\nVisit the market early, then fix the bike chain.";
    await seedNotes(page, [
      {
        id: "n-detail",
        text: FULL_TEXT,
        created_at: "2026-02-01T00:00:00.000Z",
        updated_at: "2026-02-01T00:00:00.000Z",
        items: [
          { id: "c1", text: "Buy vegetables", checked: true, position: 0 },
          { id: "c2", text: "Fix bike chain", checked: false, position: 1 },
        ],
      },
    ]);

    await page.getByText("Weekend plan", { exact: true }).click();
    await expect(page.getByLabel("Note text")).toHaveValue(FULL_TEXT);
    await expect(page.getByRole("checkbox", { name: /Buy vegetables/ })).toBeChecked();
    await expect(page.getByRole("checkbox", { name: /Fix bike chain/ })).not.toBeChecked();
  });

  test("[AC-018] reloading the page preserves notes, text and checklist checked states", async ({
    page,
  }) => {
    await clearNotes(page);

    await page.getByRole("button", { name: "New note" }).click();
    await page.getByLabel("Note text").fill("Note that must survive a reload");
    await page.getByLabel("New checklist item").fill("Keep this ticked");
    await page.getByRole("button", { name: "Add item" }).click();
    await page.getByRole("button", { name: "Save note" }).click();
    await expect(page).toHaveURL(/\/notes$/);

    await page.getByText("Note that must survive a reload", { exact: true }).click();
    await page.getByRole("checkbox", { name: /Keep this ticked/ }).check();
    await page.getByRole("button", { name: "Save note" }).click();
    await expect(page).toHaveURL(/\/notes$/);

    await page.reload();

    await expect(page.getByText("Note that must survive a reload", { exact: true })).toBeVisible();
    await page.getByText("Note that must survive a reload", { exact: true }).click();
    await expect(page.getByLabel("Note text")).toHaveValue("Note that must survive a reload");
    await expect(page.getByRole("checkbox", { name: /Keep this ticked/ })).toBeChecked();
  });
});

test.describe("no server round-trip for note data", () => {
  test("[AC-019, NFR-001] no request carrying note data is sent during create, edit and delete", async ({
    page,
  }) => {
    await clearNotes(page);
    const SECRET = "qa-crud-sentinel-contents-must-stay-client-side";
    const leaked: string[] = [];

    page.on("request", (request) => {
      const postData = request.postData();
      const url = request.url();
      if (postData?.includes(SECRET)) leaked.push(`POST ${url} :: ${postData}`);
      if (url.includes(SECRET) || url.includes(encodeURIComponent(SECRET))) {
        leaked.push(`GET ${url}`);
      }
    });

    // Create
    await page.getByRole("button", { name: "New note" }).click();
    await page.getByLabel("Note text").fill(SECRET);
    await page.getByRole("button", { name: "Add item" });
    await page.getByLabel("New checklist item").fill(SECRET);
    await page.getByRole("button", { name: "Add item" }).click();
    await page.getByRole("button", { name: "Save note" }).click();
    await expect(page).toHaveURL(/\/notes$/);

    // Edit
    await page.getByText(SECRET).first().click();
    await page.getByLabel("Note text").fill(SECRET + " edited");
    await page.getByRole("button", { name: "Save note" }).click();
    await expect(page).toHaveURL(/\/notes$/);

    // Delete
    const deleteButtons = page.getByRole("button", { name: /^Delete “/ });
    await expect(deleteButtons.first()).toBeVisible();
    await deleteButtons.first().click();
    await page.getByRole("button", { name: "Delete" }).click();

    expect(leaked).toEqual([]);
  });
});
