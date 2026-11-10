import { render } from "@testing-library/svelte";
import { tick } from "svelte";
import { describe, expect, it } from "vitest";

import App, { routes } from "./App.svelte";
import { go, location } from "./lib/router.svelte";

describe("App", () => {
  it("renders a screen inside the app shell and shows its menu", async () => {
    go("/notes");
    const { container } = render(App);
    await tick();
    expect(container.textContent).toContain("Notes");
  });

  // US-014 / AC-025: nothing in the route table requires signing up or logging in before
  // a visitor can use the app -- there is no login/registration screen to be sent to.
  it("has no login, registration, or account route to gate the app behind", () => {
    const gated = routes.filter((route) => /login|register|sign-?up|account/i.test(route.path));
    expect(gated).toEqual([]);
  });

  it("sends an unknown first visit straight to the usable notes screen, not to a gate", async () => {
    go("/");
    const { container } = render(App);
    await tick();
    expect(location.path).toBe("/notes");
    expect(container.textContent).toContain("Notes");
    expect(container.querySelector('input[type="password"]')).toBeNull();
  });
});
