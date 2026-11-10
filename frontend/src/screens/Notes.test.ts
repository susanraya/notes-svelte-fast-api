import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { createNote, getNote, listNotes } from "@/lib/notes";
import Notes from "./Notes.svelte";

beforeEach(() => {
  window.localStorage.clear();
});

function seed() {
  const a = createNote({ text: "Groceries for the week", items: [] });
  const b = createNote({
    text: "Standup notes",
    items: [{ text: "Ask Meera for logs", checked: false, position: 0 }],
  });
  const c = createNote({ text: "Books to read", items: [] });
  return { a, b, c };
}

// US-014 / AC-025: a first-time visitor can create and manage notes immediately,
// with no registration, login, or request for personal details anywhere on the screen.
describe("Notes screen (AC-025 no login required)", () => {
  it("shows the list and the action to add a note with nothing to sign in or register first", () => {
    seed();
    render(Notes);

    expect(screen.getByRole("heading", { name: /notes/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "New note" })).toBeEnabled();

    // No credential or personal-detail fields, and no gate to get past.
    expect(screen.queryByLabelText(/e-?mail/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/password/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("textbox", { name: /name|phone/i })).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /sign in|log in|register|sign up/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /sign in|log in|register|sign up/i })).toBeNull();
  });

  it("lets a note be managed (deleted) right away, with no account step in the way", async () => {
    seed();
    const user = userEvent.setup();
    render(Notes);

    const deleteButtons = screen.getAllByRole("button", { name: /^Delete “/ });
    expect(deleteButtons.length).toBeGreaterThan(0);

    await user.click(deleteButtons[0]);
    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(screen.getByText(/Deleted “/)).toBeInTheDocument();
  });
});

describe("Notes screen (list, search, delete)", () => {
  it("renders notes from listNotes(), newest-updated first, with no hardcoded seed", () => {
    const { a, c } = seed();
    render(Notes);

    const order = listNotes().map((n) => n.id);
    expect(order[0]).toBe(c.id);
    expect(order[order.length - 1]).toBe(a.id);
    expect(screen.getByText("Groceries for the week")).toBeInTheDocument();
    expect(screen.getByText("Standup notes")).toBeInTheDocument();
    expect(screen.getByText("Books to read")).toBeInTheDocument();
  });

  it("[AC-011] typing a term shows only notes whose text or checklist item text matches, case-insensitive", async () => {
    seed();
    const user = userEvent.setup();
    render(Notes);

    const search = screen.getByRole("searchbox", { name: /search notes/i });
    await user.type(search, "MEERA");

    expect(screen.getByText("Standup notes")).toBeInTheDocument();
    expect(screen.queryByText("Groceries for the week")).not.toBeInTheDocument();
    expect(screen.queryByText("Books to read")).not.toBeInTheDocument();
  });

  it("[AC-012] clearing the search box restores the full list, newest first", async () => {
    seed();
    const user = userEvent.setup();
    render(Notes);

    const search = screen.getByRole("searchbox", { name: /search notes/i });
    await user.type(search, "groceries");
    expect(screen.queryByText("Books to read")).not.toBeInTheDocument();

    await user.clear(search);

    expect(screen.getByText("Groceries for the week")).toBeInTheDocument();
    expect(screen.getByText("Standup notes")).toBeInTheDocument();
    expect(screen.getByText("Books to read")).toBeInTheDocument();
  });

  it("[AC-013] when no note matches the term, a no-results message is shown and the list has zero entries", async () => {
    seed();
    const user = userEvent.setup();
    render(Notes);

    const search = screen.getByRole("searchbox", { name: /search notes/i });
    await user.type(search, "zzzznotfound");

    expect(screen.getByText(/Nothing by that word/i)).toBeInTheDocument();
    expect(screen.queryByText("Groceries for the week")).not.toBeInTheDocument();
    expect(screen.queryByText("Standup notes")).not.toBeInTheDocument();
    expect(screen.queryByText("Books to read")).not.toBeInTheDocument();
  });

  it("[AC-016] deleting a note removes it from the list and from local storage immediately", async () => {
    const { a } = seed();
    const user = userEvent.setup();
    render(Notes);

    const deleteButton = screen.getByRole("button", { name: `Delete “Groceries for the week”` });
    await user.click(deleteButton);
    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(screen.queryByText("Groceries for the week")).not.toBeInTheDocument();
    expect(getNote(a.id)).toBeNull();
  });

  it("[AC-017] no trash, undo, or recovery affordance exists anywhere on the screen", async () => {
    seed();
    const user = userEvent.setup();
    render(Notes);

    expect(screen.queryByRole("button", { name: /undo/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /trash|recover/i })).not.toBeInTheDocument();

    const deleteButton = screen.getByRole("button", { name: `Delete “Groceries for the week”` });
    await user.click(deleteButton);
    expect(screen.getByText(/no trash and no undo/i)).toBeInTheDocument();
  });

  it("after a delete, reloading (re-rendering fresh from storage) still shows the note gone", async () => {
    const { a } = seed();
    const user = userEvent.setup();
    const { unmount } = render(Notes);

    const deleteButton = screen.getByRole("button", { name: `Delete “Groceries for the week”` });
    await user.click(deleteButton);
    await user.click(screen.getByRole("button", { name: "Delete" }));
    unmount();

    render(Notes);
    expect(screen.queryByText("Groceries for the week")).not.toBeInTheDocument();
    expect(getNote(a.id)).toBeNull();
  });
});
