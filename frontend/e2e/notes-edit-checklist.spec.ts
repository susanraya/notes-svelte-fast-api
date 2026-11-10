import { expect, test, type Page } from "@playwright/test";

/**
 * US-007-2 -- Note editing and checklist toggling, including persistence in
 * local storage.
 *
 * Seeds the "notes_v1" localStorage key before navigation (per constraint),
 * then drives the real UI and reads back what was actually persisted.
 *
 * NFR-005 (CDN delivery for mobile India): not testable from this harness, which
 * serves the build from a local preview server rather than a global CDN. Not
 * blocking this ticket.
 */

const STORAGE_KEY = "notes_v1";

async function seedNotes(page: Page, notes: unknown[]) {
  await page.goto("/notes");
  await page.evaluate(({ key, value }) => localStorage.setItem(key, JSON.stringify(value)), {
    key: STORAGE_KEY,
    value: notes,
  });
  await page.reload();
}

async function readNotes(page: Page): Promise<Array<Record<string, unknown>>> {
  return page.evaluate((key) => {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  }, STORAGE_KEY);
}

const SEEDED_NOTE = {
  id: "n-edit",
  text: "Groceries and errands",
  created_at: "2026-03-01T00:00:00.000Z",
  updated_at: "2026-03-01T00:00:00.000Z",
  items: [
    { id: "c1", text: "Buy milk", checked: false, position: 0 },
    { id: "c2", text: "Pay electricity bill", checked: false, position: 1 },
    { id: "c3", text: "Return library book", checked: false, position: 2 },
  ],
};

test.describe("checklist toggle persistence", () => {
  test("[AC-005, AC-006] toggling a checklist item updates the UI and the notes_v1 payload, and survives reload", async ({
    page,
  }) => {
    await seedNotes(page, [SEEDED_NOTE]);

    await page.getByText("Groceries and errands", { exact: true }).click();

    const checkbox = page.getByRole("checkbox", { name: /Buy milk/ });
    await expect(checkbox).not.toBeChecked();
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    // Persisted immediately, without pressing Save.
    let notes = await readNotes(page);
    let note = notes.find((n) => n.id === "n-edit") as {
      items: Array<{ id: string; checked: boolean }>;
    };
    expect(note.items.find((i) => i.id === "c1")?.checked).toBe(true);
    expect(note.items.find((i) => i.id === "c2")?.checked).toBe(false);

    await page.reload();

    await expect(page.getByRole("checkbox", { name: /Buy milk/ })).toBeChecked();
    await expect(page.getByRole("checkbox", { name: /Pay electricity bill/ })).not.toBeChecked();

    notes = await readNotes(page);
    note = notes.find((n) => n.id === "n-edit") as {
      items: Array<{ id: string; checked: boolean }>;
    };
    expect(note.items.find((i) => i.id === "c1")?.checked).toBe(true);
  });
});

test.describe("editing text and items", () => {
  test("[AC-014] edited text and items persist after save and reload", async ({ page }) => {
    await seedNotes(page, [SEEDED_NOTE]);

    await page.getByText("Groceries and errands", { exact: true }).click();
    await page.getByLabel("Note text").fill("Groceries and errands — updated plan");
    await page.getByLabel("New checklist item").fill("Pick up dry cleaning");
    await page.getByRole("button", { name: "Add item" }).click();
    await page.getByRole("button", { name: "Save note" }).click();
    await expect(page).toHaveURL(/\/notes$/);

    await page.reload();
    await page.getByText("Groceries and errands — updated plan", { exact: true }).click();

    await expect(page.getByLabel("Note text")).toHaveValue("Groceries and errands — updated plan");
    await expect(page.getByText("Buy milk")).toBeVisible();
    await expect(page.getByText("Pay electricity bill")).toBeVisible();
    await expect(page.getByText("Return library book")).toBeVisible();
    await expect(page.getByText("Pick up dry cleaning")).toBeVisible();

    const notes = await readNotes(page);
    const note = notes.find((n) => n.id === "n-edit") as {
      text: string;
      items: Array<{ text: string }>;
    };
    expect(note.text).toBe("Groceries and errands — updated plan");
    expect(note.items.map((i) => i.text)).toEqual([
      "Buy milk",
      "Pay electricity bill",
      "Return library book",
      "Pick up dry cleaning",
    ]);
  });

  test("[AC-015] a removed item is gone after save while the remaining items are unchanged", async ({
    page,
  }) => {
    await seedNotes(page, [SEEDED_NOTE]);

    await page.getByText("Groceries and errands", { exact: true }).click();

    // Select and remove the middle item.
    await page.getByRole("button", { name: "Select — Pay electricity bill, for removal" }).click();
    await page.getByRole("button", { name: "Remove item" }).click();
    await expect(page.getByText("Pay electricity bill")).toHaveCount(0);

    await page.getByRole("button", { name: "Save note" }).click();
    await expect(page).toHaveURL(/\/notes$/);

    await page.reload();
    await page.getByText("Groceries and errands", { exact: true }).click();

    await expect(page.getByText("Pay electricity bill")).toHaveCount(0);
    await expect(page.getByText("Buy milk")).toBeVisible();
    await expect(page.getByText("Return library book")).toBeVisible();

    const notes = await readNotes(page);
    const note = notes.find((n) => n.id === "n-edit") as {
      items: Array<{ text: string; checked: boolean; position: number }>;
    };
    expect(note.items.map((i) => i.text)).toEqual(["Buy milk", "Return library book"]);
    expect(note.items.map((i) => i.checked)).toEqual([false, false]);
    expect(note.items.map((i) => i.position)).toEqual([0, 1]);
  });
});

test.describe("delete from the detail screen", () => {
  test("[AC-detail-delete] deleting from the detail screen removes the note from local storage and returns to the list", async ({
    page,
  }) => {
    await seedNotes(page, [SEEDED_NOTE]);

    await page.getByText("Groceries and errands", { exact: true }).click();
    await expect(page).toHaveURL(/\/note-detail/);

    await page.getByRole("button", { name: "Delete note (permanent)" }).click();
    await expect(page).toHaveURL(/\/notes$/);

    const notes = await readNotes(page);
    expect(notes.find((n) => n.id === "n-edit")).toBeUndefined();
    expect(notes).toHaveLength(0);
    await expect(page.getByText("Groceries and errands")).toHaveCount(0);
  });
});
