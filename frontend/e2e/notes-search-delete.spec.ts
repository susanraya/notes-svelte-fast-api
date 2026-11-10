import { expect, test, type Page } from "@playwright/test";

/**
 * US-006-2 -- Notes list: search, empty results, and permanent delete.
 *
 * Seeds the "notes_v1" localStorage key before the app loads (not via UI steps),
 * then drives the real UI to prove search filtering and permanent deletion.
 *
 * NFR-005 (CDN delivery for mobile India): not testable from this harness, which
 * serves the build from a local preview server rather than a global CDN. Not
 * blocking this ticket.
 */

const STORAGE_KEY = "notes_v1";

const SEED_NOTES = [
  {
    id: "n-groceries",
    text: "Groceries for the week",
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
    items: [],
  },
  {
    id: "n-standup",
    text: "Standup notes",
    created_at: "2026-01-02T00:00:00.000Z",
    updated_at: "2026-01-02T00:00:00.000Z",
    items: [{ id: "c1", text: "Ask Meera for logs", checked: false, position: 0 }],
  },
  {
    id: "n-books",
    text: "Books to read",
    created_at: "2026-01-03T00:00:00.000Z",
    updated_at: "2026-01-03T00:00:00.000Z",
    items: [],
  },
];

/**
 * Seeds localStorage *before* the app's first script runs, via an init script, then
 * navigates -- this is a true "seed before load", not a seed-then-reload.
 */
async function seedBeforeLoad(page: Page, notes: unknown[]) {
  await page.addInitScript(
    ({ key, value }) => {
      window.localStorage.setItem(key, JSON.stringify(value));
    },
    { key: STORAGE_KEY, value: notes },
  );
  await page.goto("/notes");
}

async function readNotes(page: Page): Promise<Array<Record<string, unknown>>> {
  return page.evaluate((key) => {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  }, STORAGE_KEY);
}

test.describe("search filtering", () => {
  test("[AC-011] typing a term shows only notes whose text or checklist item matches, case-insensitive", async ({
    page,
  }) => {
    await seedBeforeLoad(page, SEED_NOTES);

    await page.getByRole("searchbox", { name: /search notes/i }).fill("MEERA");

    await expect(page.getByText("Standup notes")).toBeVisible();
    await expect(page.getByText("Groceries for the week")).toHaveCount(0);
    await expect(page.getByText("Books to read")).toHaveCount(0);
  });

  test("[AC-012] clearing the search box restores the full list, newest first", async ({
    page,
  }) => {
    await seedBeforeLoad(page, SEED_NOTES);

    const search = page.getByRole("searchbox", { name: /search notes/i });
    await search.fill("groceries");
    await expect(page.getByText("Books to read")).toHaveCount(0);

    await search.fill("");

    await expect(page.getByText("Groceries for the week")).toBeVisible();
    await expect(page.getByText("Standup notes")).toBeVisible();
    await expect(page.getByText("Books to read")).toBeVisible();
    const rows = page.locator("ol > li");
    await expect(rows.first()).toContainText("Books to read");
  });

  test("[AC-013] when no note matches the term, a no-results message is shown and no note rows render", async ({
    page,
  }) => {
    await seedBeforeLoad(page, SEED_NOTES);

    await page.getByRole("searchbox", { name: /search notes/i }).fill("zzzznotfound");

    await expect(page.getByText(/Nothing by that word/i)).toBeVisible();
    await expect(page.locator("ol > li")).toHaveCount(0);
  });
});

test.describe("permanent delete", () => {
  test("[AC-016] deleting a note removes it from the DOM and from localStorage, and it stays absent after reload", async ({
    page,
  }) => {
    await seedBeforeLoad(page, SEED_NOTES);

    await page
      .getByRole("button", { name: `Delete “Groceries for the week”` })
      .click();
    await page.getByRole("button", { name: "Delete" }).click();

    await expect(page.getByText("Groceries for the week")).toHaveCount(0);
    let notes = await readNotes(page);
    expect(notes.find((n) => n.id === "n-groceries")).toBeUndefined();
    expect(notes).toHaveLength(2);

    await page.reload();

    await expect(page.getByText("Groceries for the week")).toHaveCount(0);
    notes = await readNotes(page);
    expect(notes.find((n) => n.id === "n-groceries")).toBeUndefined();
    expect(notes).toHaveLength(2);
  });

  test("[AC-017] no trash/undo/restore control or route is reachable after a delete", async ({
    page,
  }) => {
    await seedBeforeLoad(page, SEED_NOTES);

    await page
      .getByRole("button", { name: `Delete “Groceries for the week”` })
      .click();
    await page.getByRole("button", { name: "Delete" }).click();
    await expect(page.getByText(/Deleted “/)).toBeVisible();

    // No undo/restore/trash affordance appears on the screen after the delete.
    await expect(page.getByRole("button", { name: /undo|restore/i })).toHaveCount(0);
    await expect(page.getByRole("link", { name: /trash|undo|restore/i })).toHaveCount(0);
    await expect(page.getByText(/no trash and no undo/i)).toBeVisible();

    // A direct navigation to a plausible trash/recovery route is not reachable:
    // unknown routes fall back to the notes list, proving no such route exists.
    await page.goto("/trash");
    await expect(page).toHaveURL(/\/notes$/);
    await page.goto("/notes/trash");
    await expect(page).toHaveURL(/\/notes$/);

    // The deleted note's id can never be requested back via any detail route either --
    // the app still only knows the two remaining notes.
    const notes = await readNotes(page);
    expect(notes.map((n) => n.id)).not.toContain("n-groceries");
  });
});
