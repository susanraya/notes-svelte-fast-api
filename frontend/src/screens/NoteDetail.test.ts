import { fireEvent, render, screen } from "@testing-library/svelte";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { createNote, getNote, listNotes } from "@/lib/notes";
import { go, location } from "@/lib/router.svelte";
import NoteDetail from "./NoteDetail.svelte";

async function flush() {
  await Promise.resolve();
  await Promise.resolve();
}

beforeEach(() => {
  window.localStorage.clear();
  go("/note-detail", true);
});

describe("NoteDetail (load, new, not-found)", () => {
  it("loads the note by the id in the route via getNote(), with no hardcoded text or items", async () => {
    const note = createNote({
      text: "Weekend plan\nVisit the market early.",
      items: [
        { text: "Buy vegetables", checked: true, position: 0 },
        { text: "Fix bike chain", checked: false, position: 1 },
      ],
    });
    go(`/note-detail/${note.id}`, true);
    render(NoteDetail);
    await flush();

    expect(screen.getByLabelText("Note text")).toHaveValue(note.text);
    expect(screen.getByRole("checkbox", { name: /Buy vegetables/ })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: /Fix bike chain/ })).not.toBeChecked();
    expect(screen.queryByText(/Jayanagar|Araku dark roast/i)).not.toBeInTheDocument();
  });

  it("opening the screen with no id creates a new note on save via createNote()", async () => {
    vi.useFakeTimers();
    go("/note-detail", true);
    render(NoteDetail);
    await flush();

    const textarea = screen.getByLabelText("Note text");
    await fireEvent.input(textarea, { target: { value: "A brand new note" } });
    await fireEvent.click(screen.getByRole("button", { name: /Save note/ }));

    await vi.advanceTimersByTimeAsync(600);
    vi.useRealTimers();
    await flush();

    const notes = listNotes();
    expect(notes).toHaveLength(1);
    expect(notes[0].text).toBe("A brand new note");
    expect(location.path).toBe("/notes");
  });

  it("opening an unknown id shows a not-found state and a way back to the list", async () => {
    go("/note-detail/does-not-exist", true);
    render(NoteDetail);
    await flush();

    expect(screen.getByText(/not found/i)).toBeInTheDocument();
    expect(screen.queryByLabelText("Note text")).not.toBeInTheDocument();

    await fireEvent.click(screen.getByRole("button", { name: /Return to the notes list/i }));
    expect(location.path).toBe("/notes");
  });
});

describe("NoteDetail (checklist toggles persist immediately)", () => {
  it("[AC-005] checking an unchecked checklist item shows it checked and persists checked:true immediately", async () => {
    const note = createNote({
      text: "Shopping",
      items: [{ text: "Milk", checked: false, position: 0 }],
    });
    go(`/note-detail/${note.id}`, true);
    render(NoteDetail);
    await flush();

    const checkbox = screen.getByRole("checkbox", { name: /Milk/ });
    expect(checkbox).not.toBeChecked();

    await fireEvent.click(checkbox);
    await flush();

    expect(checkbox).toBeChecked();
    expect(getNote(note.id)?.items[0].checked).toBe(true);
  });

  it("[AC-006] unchecking a checked item shows it unchecked and persists checked:false immediately", async () => {
    const note = createNote({
      text: "Shopping",
      items: [{ text: "Milk", checked: true, position: 0 }],
    });
    go(`/note-detail/${note.id}`, true);
    render(NoteDetail);
    await flush();

    const checkbox = screen.getByRole("checkbox", { name: /Milk/ });
    expect(checkbox).toBeChecked();

    await fireEvent.click(checkbox);
    await flush();

    expect(checkbox).not.toBeChecked();
    expect(getNote(note.id)?.items[0].checked).toBe(false);
  });
});

describe("NoteDetail (edit, save, reload)", () => {
  it("[AC-014] changing the note text or checklist items and saving updates the note via updateNote() and the changes survive a page reload", async () => {
    vi.useFakeTimers();
    const note = createNote({ text: "Old text", items: [{ text: "Old item", checked: false, position: 0 }] });
    go(`/note-detail/${note.id}`, true);
    const { unmount } = render(NoteDetail);
    await flush();

    await fireEvent.input(screen.getByLabelText("Note text"), { target: { value: "New text" } });
    await fireEvent.click(screen.getByRole("button", { name: /Save note/ }));
    await vi.advanceTimersByTimeAsync(600);
    vi.useRealTimers();
    await flush();

    unmount();

    // Simulate a reload: re-read the note fresh from storage.
    const reloaded = getNote(note.id);
    expect(reloaded?.text).toBe("New text");
    expect(reloaded?.items.map((i) => i.text)).toEqual(["Old item"]);

    go(`/note-detail/${note.id}`, true);
    render(NoteDetail);
    await flush();
    expect(screen.getByLabelText("Note text")).toHaveValue("New text");
  });

  it("[AC-015] removing a checklist item and saving drops only that item, keeping remaining text/checked/positions", async () => {
    vi.useFakeTimers();
    const note = createNote({
      text: "List",
      items: [
        { text: "First", checked: true, position: 0 },
        { text: "Second", checked: false, position: 1 },
        { text: "Third", checked: true, position: 2 },
      ],
    });
    go(`/note-detail/${note.id}`, true);
    render(NoteDetail);
    await flush();

    await fireEvent.click(screen.getByRole("button", { name: /Select — Second/ }));
    await fireEvent.click(screen.getByRole("button", { name: /Remove item/ }));
    await fireEvent.click(screen.getByRole("button", { name: /Save note/ }));
    await vi.advanceTimersByTimeAsync(600);
    vi.useRealTimers();
    await flush();

    const updated = getNote(note.id);
    expect(updated?.items.map((i) => i.text)).toEqual(["First", "Third"]);
    expect(updated?.items.map((i) => i.checked)).toEqual([true, true]);
    expect(updated?.items.map((i) => i.position)).toEqual([0, 1]);
  });
});

describe("NoteDetail (delete)", () => {
  it("deletes the note immediately, with no undo, and returns to the list", async () => {
    const note = createNote({ text: "Gone soon", items: [] });
    go(`/note-detail/${note.id}`, true);
    render(NoteDetail);
    await flush();

    expect(screen.queryByRole("button", { name: /undo/i })).not.toBeInTheDocument();

    await fireEvent.click(screen.getByRole("button", { name: /Delete note/ }));

    expect(getNote(note.id)).toBeNull();
    expect(location.path).toBe("/notes");
  });
});
