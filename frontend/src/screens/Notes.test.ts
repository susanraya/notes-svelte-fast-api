import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import Notes from "./Notes.svelte";

// US-014 / AC-025: a first-time visitor can create and manage notes immediately,
// with no registration, login, or request for personal details anywhere on the screen.
describe("Notes screen (AC-025 no login required)", () => {
  it("shows the list and the action to add a note with nothing to sign in or register first", () => {
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
    const user = userEvent.setup();
    render(Notes);

    const deleteButtons = screen.getAllByRole("button", { name: /^Delete “/ });
    expect(deleteButtons.length).toBeGreaterThan(0);

    await user.click(deleteButtons[0]);
    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(screen.getByText(/Deleted “/)).toBeInTheDocument();
  });
});
