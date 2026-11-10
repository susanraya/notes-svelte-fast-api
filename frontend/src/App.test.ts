import { render } from "@testing-library/svelte";
import { tick } from "svelte";
import { describe, expect, it } from "vitest";

import App from "./App.svelte";
import { go } from "./lib/router.svelte";

describe("App", () => {
  it("renders a screen inside the app shell and shows its menu", async () => {
    go("/notes");
    const { container } = render(App);
    await tick();
    expect(container.textContent).toContain("Notes");
  });
});
