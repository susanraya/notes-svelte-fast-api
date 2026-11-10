<script module lang="ts">
  import type { Component } from "svelte";

  import Notes from "./screens/Notes.svelte";
  import NoteDetail from "./screens/NoteDetail.svelte";
  import Backup from "./screens/Backup.svelte";

  // Screens marked bare (shown before sign-in, or hidden from the menu) render on their own.
  export const routes: Array<{ path: string; component: Component; bare?: boolean }> = [
    { path: "/notes", component: Notes },
    { path: "/note-detail", component: NoteDetail },
    { path: "/note-detail/:id", component: NoteDetail },
    { path: "/backup", component: Backup },
  ];
  // Where an unknown path lands.
  export const fallback = "/notes";
</script>

<script lang="ts">
  import { go, location, matches } from "./lib/router.svelte";
  import { Icon } from "./lib/ui";

  const current = $derived(routes.find((route) => matches(route.path, location.path)));

  $effect(() => {
    if (!current) go(fallback, true);
  });

  function linkClass(path: string): string {
    const active = path === "/" ? location.path === "/" : location.path.startsWith(path);
    return [
      "flex items-center gap-2 rounded-[var(--brand-radius)] px-3 py-2 text-sm font-medium transition-colors",
      active ? "bg-[var(--brand-hover)] text-[var(--brand-fg)]" : "text-[var(--brand-fg-muted)]",
    ].join(" ");
  }

  function follow(event: MouseEvent, path: string): void {
    event.preventDefault();
    go(path);
  }
</script>

{#if current?.bare}
  <current.component />
{:else if current}
  <div class="flex min-h-screen flex-col">
    <header
      class="border-b"
      style="background-color: var(--brand-surface); border-color: var(--brand-border)"
    >
      <div class="flex items-center gap-6 px-6 py-2">
        <p class="shrink-0 text-sm font-semibold" style="font-family: var(--brand-font-heading)">
          Notes
        </p>
        <nav aria-label="App menu" class="flex flex-wrap items-center gap-1">
          <a href="/notes" class={linkClass("/notes")} onclick={(event) => follow(event, "/notes")}>
            <Icon name="Home" size={16} />
            Notes
          </a>
          <a
            href="/backup"
            class={linkClass("/backup")}
            onclick={(event) => follow(event, "/backup")}
          >
            <Icon name="Settings" size={16} />
            Backup &amp; About
          </a>
        </nav>
      </div>
    </header>
    <main class="flex-1 overflow-auto">
      <current.component />
    </main>
  </div>
{/if}
