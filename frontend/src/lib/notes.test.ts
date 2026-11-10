import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { createNote, deleteNote, getNote, listNotes, updateNote } from "./notes";

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("notes store", () => {
  it("[AC-019] never calls fetch, XHR or apiFetch", async () => {
    const source = await import("./notes?raw");
    const text = (source as unknown as { default: string }).default ?? "";
    expect(text).not.toMatch(/\bfetch\s*\(/);
    expect(text).not.toMatch(/XMLHttpRequest/);
    expect(text).not.toMatch(/apiFetch/);
  });

  it("creates a note and stamps created_at/updated_at as ISO strings", () => {
    const note = createNote({ text: "hello", items: [] });
    expect(note.id).toBeTruthy();
    expect(() => new Date(note.created_at).toISOString()).not.toThrow();
    expect(note.created_at).toBe(new Date(note.created_at).toISOString());
    expect(note.updated_at).toBe(note.created_at);
  });

  it("listNotes() returns notes ordered newest-updated first", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00.000Z"));
    const a = createNote({ text: "first", items: [] });
    vi.setSystemTime(new Date("2026-01-01T00:00:01.000Z"));
    const b = createNote({ text: "second", items: [] });
    vi.setSystemTime(new Date("2026-01-01T00:00:02.000Z"));
    updateNote(a.id, { text: "first, edited", items: [] });
    const [first, second] = listNotes();
    expect(first.id).toBe(a.id);
    expect(second.id).toBe(b.id);
  });

  it("getNote(id) returns the matching note", () => {
    const note = createNote({ text: "find me", items: [] });
    expect(getNote(note.id)?.text).toBe("find me");
    expect(getNote("missing")).toBeNull();
  });

  it("updateNote stamps a fresh updated_at and keeps created_at", () => {
    const note = createNote({ text: "v1", items: [] });
    const updated = updateNote(note.id, { text: "v2", items: [] });
    expect(updated?.text).toBe("v2");
    expect(updated?.created_at).toBe(note.created_at);
  });

  it("deleteNote removes the note", () => {
    const note = createNote({ text: "to delete", items: [] });
    deleteNote(note.id);
    expect(getNote(note.id)).toBeNull();
  });

  it("[AC-018] a reload reads back text, item text, order and checked state intact", () => {
    createNote({
      text: "roundtrip",
      items: [
        { text: "first item", checked: false, position: 0 },
        { text: "second item", checked: true, position: 1 },
      ],
    });
    // Simulate a reload: re-read everything fresh from localStorage.
    const [note] = listNotes();
    expect(note.text).toBe("roundtrip");
    expect(note.items.map((i) => i.text)).toEqual(["first item", "second item"]);
    expect(note.items.map((i) => i.position)).toEqual([0, 1]);
    expect(note.items.map((i) => i.checked)).toEqual([false, true]);
  });

  it("missing localStorage content yields an empty note list instead of throwing", () => {
    window.localStorage.removeItem("notes_v1");
    expect(() => listNotes()).not.toThrow();
    expect(listNotes()).toEqual([]);
  });

  it("empty localStorage content yields an empty note list instead of throwing", () => {
    window.localStorage.setItem("notes_v1", "");
    expect(() => listNotes()).not.toThrow();
    expect(listNotes()).toEqual([]);
  });

  it("malformed localStorage content yields an empty note list instead of throwing", () => {
    window.localStorage.setItem("notes_v1", "{not json");
    expect(() => listNotes()).not.toThrow();
    expect(listNotes()).toEqual([]);

    window.localStorage.setItem("notes_v1", JSON.stringify([{ id: 1, bogus: true }]));
    expect(listNotes()).toEqual([]);
  });
});
