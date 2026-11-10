/**
 * The app's router: the current path as state, moved through the browser's history, and
 * route patterns with `:param` segments. Small on purpose -- the screens move by
 * `navigate(route)` and nothing else, and `App.svelte` maps a path to its screen.
 */

// "/" normally, and the prefix a live preview is served under when built with one.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

function current(): string {
  const path = window.location.pathname;
  return (path.startsWith(BASE) ? path.slice(BASE.length) : path) || "/";
}

export const location = $state({ path: current() });

window.addEventListener("popstate", () => {
  location.path = current();
});

/** Move to `path`, as a new history entry, or in place of the current one. */
export function go(path: string, replace = false): void {
  window.history[replace ? "replaceState" : "pushState"]({}, "", BASE + path);
  location.path = path;
}

/** Whether `path` fits `pattern` (`/orders/:id` fits `/orders/7`). */
export function matches(pattern: string, path: string): boolean {
  const want = pattern.split("/").filter(Boolean);
  const have = path.split("/").filter(Boolean);
  return (
    want.length === have.length &&
    want.every((segment, index) => segment.startsWith(":") || segment === have[index])
  );
}
