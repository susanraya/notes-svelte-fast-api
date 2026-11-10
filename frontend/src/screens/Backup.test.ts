import { fireEvent, render, screen, within } from "@testing-library/svelte";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { createNote, exportNotes, listNotes } from "@/lib/notes";
import Backup from "./Backup.svelte";

async function flush() {
  await Promise.resolve();
  await Promise.resolve();
  await new Promise((resolve) => setTimeout(resolve, 0));
}

function fileFromText(name: string, text: string): File {
  return new File([text], name, { type: "application/json" });
}

beforeEach(() => {
  window.localStorage.clear();
  vi.restoreAllMocks();
  if (typeof URL.createObjectURL !== "function") {
    URL.createObjectURL = () => "blob:fake";
  }
  if (typeof URL.revokeObjectURL !== "function") {
    URL.revokeObjectURL = () => {};
  }
});

describe("Backup screen reads from the real note store", () => {
  it("reads notes from listNotes() with no hardcoded notes array", () => {
    createNote({ text: "Only note here", items: [{ text: "item", checked: true, position: 0 }] });
    render(Backup);
    const header = screen.getByRole("banner");
    expect(within(header).getByText(/1 notes · 1 checklist items/)).toBeInTheDocument();
    expect(screen.queryByText(/Kalsubai trek/)).not.toBeInTheDocument();
  });
});

describe("[AC-022] export", () => {
  it("downloads a JSON file containing every stored note with text, timestamps and checklist states", async () => {
    createNote({
      text: "Trip plan",
      items: [
        { text: "Pack bag", checked: true, position: 0 },
        { text: "Buy tickets", checked: false, position: 1 },
      ],
    });
    render(Backup);

    let capturedBlob: Blob | null = null;
    const createObjectURL = vi
      .spyOn(URL, "createObjectURL")
      .mockImplementation((obj: Blob | MediaSource) => {
        capturedBlob = obj as Blob;
        return "blob:fake";
      });
    vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {});
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});

    vi.useFakeTimers();
    const button = screen.getByRole("button", { name: /Export notes/ });
    await fireEvent.click(button);
    await vi.advanceTimersByTimeAsync(450);
    vi.useRealTimers();
    await flush();

    expect(createObjectURL).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(capturedBlob).not.toBeNull();
    const text: string = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsText(capturedBlob as Blob);
    });
    const parsed = JSON.parse(text);
    expect(parsed.notes).toHaveLength(1);
    expect(parsed.notes[0].text).toBe("Trip plan");
    expect(parsed.notes[0].created_at).toBeTruthy();
    expect(parsed.notes[0].updated_at).toBeTruthy();
    expect(parsed.notes[0].items.map((i: { checked: boolean }) => i.checked)).toEqual([
      true,
      false,
    ]);
  });
});

describe("[AC-023] import round-trip", () => {
  it("importing a file previously produced by export writes those notes into storage and they appear in the notes list", async () => {
    createNote({
      text: "Export me",
      items: [{ text: "Do it", checked: true, position: 0 }],
    });
    const exported = exportNotes();
    window.localStorage.clear();
    expect(listNotes()).toEqual([]);

    render(Backup);
    const input = screen.getByLabelText(/Choose a previously exported file/i) as HTMLInputElement;
    const file = fileFromText("backup.json", exported);
    await fireEvent.change(input, { target: { files: [file] } });
    await flush();
    await fireEvent.click(screen.getByRole("button", { name: /Import notes/ }));
    await flush();
    await flush();

    const notes = listNotes();
    expect(notes).toHaveLength(1);
    expect(notes[0].text).toBe("Export me");
    expect(notes[0].items[0].checked).toBe(true);
    expect(screen.getByRole("status")).toHaveTextContent(/Imported/);
  });
});

describe("[AC-024] invalid import file", () => {
  it("shows an error, imports nothing, and leaves existing notes byte-identical", async () => {
    createNote({ text: "Keep me", items: [] });
    const before = window.localStorage.getItem("notes_v1");

    render(Backup);
    const input = screen.getByLabelText(/Choose a previously exported file/i) as HTMLInputElement;
    const file = fileFromText("bad.json", "{not json");
    await fireEvent.change(input, { target: { files: [file] } });
    await flush();
    await fireEvent.click(screen.getByRole("button", { name: /Import notes/ }));
    await flush();
    await flush();

    expect(screen.getByRole("alert")).toHaveTextContent(/not a valid Notes export/i);
    expect(window.localStorage.getItem("notes_v1")).toBe(before);
    expect(listNotes()).toHaveLength(1);
  });

  it("rejects a file with the wrong top-level shape", async () => {
    createNote({ text: "Keep me", items: [] });
    const before = window.localStorage.getItem("notes_v1");

    render(Backup);
    const input = screen.getByLabelText(/Choose a previously exported file/i) as HTMLInputElement;
    const file = fileFromText("wrong.json", JSON.stringify({ hello: "world" }));
    await fireEvent.change(input, { target: { files: [file] } });
    await flush();
    await fireEvent.click(screen.getByRole("button", { name: /Import notes/ }));
    await flush();
    await flush();

    expect(screen.getByRole("alert")).toHaveTextContent(/not a valid Notes export/i);
    expect(window.localStorage.getItem("notes_v1")).toBe(before);
  });

  it("rejects notes missing required fields", async () => {
    createNote({ text: "Keep me", items: [] });
    const before = window.localStorage.getItem("notes_v1");

    render(Backup);
    const input = screen.getByLabelText(/Choose a previously exported file/i) as HTMLInputElement;
    const file = fileFromText(
      "missing.json",
      JSON.stringify({ format: "notes.export", version: 1, notes: [{ id: "n1" }] }),
    );
    await fireEvent.change(input, { target: { files: [file] } });
    await flush();
    await fireEvent.click(screen.getByRole("button", { name: /Import notes/ }));
    await flush();
    await flush();

    expect(screen.getByRole("alert")).toHaveTextContent(/not a valid Notes export/i);
    expect(window.localStorage.getItem("notes_v1")).toBe(before);
  });
});
