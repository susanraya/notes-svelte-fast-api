/**
 * The one source of truth for notes: everything lives in this browser's
 * localStorage, under one versioned key. No fetch, no XHR, no network call --
 * this module must stay that way (AC-019, NFR-001).
 */

export type NoteItem = {
  id: string;
  text: string;
  checked: boolean;
  position: number;
};

export type Note = {
  id: string;
  text: string;
  created_at: string;
  updated_at: string;
  items: NoteItem[];
};

export type NoteDraft = {
  text: string;
  items: Array<{ id?: string; text: string; checked: boolean; position: number }>;
};

const STORAGE_KEY = "notes_v1";

function readAll(): Note[] {
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return [];
  }
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isNote);
  } catch {
    return [];
  }
}

function isNote(value: unknown): value is Note {
  if (!value || typeof value !== "object") return false;
  const n = value as Record<string, unknown>;
  return (
    typeof n.id === "string" &&
    typeof n.text === "string" &&
    typeof n.created_at === "string" &&
    typeof n.updated_at === "string" &&
    Array.isArray(n.items) &&
    n.items.every(
      (item) =>
        item &&
        typeof item === "object" &&
        typeof (item as Record<string, unknown>).id === "string" &&
        typeof (item as Record<string, unknown>).text === "string" &&
        typeof (item as Record<string, unknown>).checked === "boolean" &&
        typeof (item as Record<string, unknown>).position === "number",
    )
  );
}

function writeAll(notes: Note[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // Storage unavailable (private mode, quota): the write silently fails,
    // matching the pattern used for the session token elsewhere.
  }
}

// Lowercase letters, digits and single hyphens only: this id is also used as a route
// segment (/note-detail/:id), and the router's toPath() lowercases segments and collapses
// any other character to a hyphen -- using only that alphabet keeps the id unchanged
// when it round-trips through a URL.
function newId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
}

/** All notes, newest-updated first. */
export function listNotes(): Note[] {
  return [...readAll()].sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1));
}

export function getNote(id: string): Note | null {
  return readAll().find((note) => note.id === id) ?? null;
}

function mapItems(items: NoteDraft["items"]): NoteItem[] {
  return items.map((item, index) => ({
    id: item.id ?? newId("item"),
    text: item.text,
    checked: item.checked,
    position: item.position ?? index,
  }));
}

export function createNote(draft: NoteDraft): Note {
  const now = new Date().toISOString();
  const note: Note = {
    id: newId("note"),
    text: draft.text,
    created_at: now,
    updated_at: now,
    items: mapItems(draft.items),
  };
  const notes = readAll();
  notes.push(note);
  writeAll(notes);
  return note;
}

export function updateNote(id: string, draft: NoteDraft): Note | null {
  const notes = readAll();
  const index = notes.findIndex((note) => note.id === id);
  if (index === -1) return null;
  const updated: Note = {
    ...notes[index],
    text: draft.text,
    updated_at: new Date().toISOString(),
    items: mapItems(draft.items),
  };
  notes[index] = updated;
  writeAll(notes);
  return updated;
}

export function deleteNote(id: string): void {
  const notes = readAll().filter((note) => note.id !== id);
  writeAll(notes);
}

export type NotesExport = {
  format: "notes.export";
  version: 1;
  exported_at: string;
  notes: Note[];
};

/**
 * All stored notes, serialized as the JSON text for a backup file: every note's text,
 * created/updated timestamps and checklist items with their checked states (AC-022).
 */
export function exportNotes(): string {
  const payload: NotesExport = {
    format: "notes.export",
    version: 1,
    exported_at: new Date().toISOString(),
    notes: listNotes(),
  };
  return JSON.stringify(payload, null, 2);
}

function isValidImportedNotes(value: unknown): value is Note[] {
  if (!value || typeof value !== "object") return false;
  const list = Array.isArray(value) ? value : (value as Record<string, unknown>).notes;
  if (!Array.isArray(list)) return false;
  return list.every(isNote);
}

/**
 * Reads `jsonText` -- the contents of a file chosen for import -- and, only if it is a
 * valid notes export (AC-023), writes those notes into local storage: new notes are
 * added, notes sharing an id with one already stored are replaced by the imported copy.
 * Throws, and leaves existing storage byte-identical, on malformed JSON, the wrong
 * top-level shape, or any note missing a required field (AC-024).
 */
export function importNotes(jsonText: string): number {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new Error("That file is not valid JSON.");
  }
  if (!isValidImportedNotes(parsed)) {
    throw new Error("That file is not a valid notes export.");
  }
  const list = Array.isArray(parsed) ? parsed : (parsed as { notes: Note[] }).notes;
  const existing = readAll();
  const byId = new Map(existing.map((note) => [note.id, note]));
  for (const note of list) {
    byId.set(note.id, note);
  }
  writeAll([...byId.values()]);
  return list.length;
}
