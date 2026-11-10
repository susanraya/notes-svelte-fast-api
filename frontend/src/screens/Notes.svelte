<script>
  /* eslint-disable @typescript-eslint/no-unused-vars -- generated imports, matched generously */
  import { Button, Icon, Input, Label } from "@/lib/ui";
  import { brand } from "@/lib/brand";
  import { useNavigate } from "@/lib/navigate";

  const navigate = useNavigate();

  const MONO = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace';
  const thick = `3px solid ${brand.primaryColor}`;
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const SEED = [
    {
      id: "n-9f31",
      wf: "i-2-0-0",
      text: "Groceries for the week\nMilk run before Thursday — the shop shuts at 8.",
      created_at: "2026-11-04T09:12:00",
      updated_at: "2026-11-10T14:32:00",
      items: [
        { id: "c-9f31-1", note_id: "n-9f31", text: "Oat milk, 2 litres", checked: true, position: 0 },
        { id: "c-9f31-2", note_id: "n-9f31", text: "Brown eggs, half dozen", checked: true, position: 1 },
        { id: "c-9f31-3", note_id: "n-9f31", text: "Toor dal, 1 kg", checked: true, position: 2 },
        { id: "c-9f31-4", note_id: "n-9f31", text: "Filter coffee powder", checked: true, position: 3 },
        { id: "c-9f31-5", note_id: "n-9f31", text: "Tomatoes and green chillies", checked: false, position: 4 },
        { id: "c-9f31-6", note_id: "n-9f31", text: "Dishwashing bar", checked: false, position: 5 },
        { id: "c-9f31-7", note_id: "n-9f31", text: "Bin liners, medium", checked: false, position: 6 }
      ]
    },
    {
      id: "n-7c08",
      wf: "i-2-0-1",
      text: "Standup notes: ship search, fix list order\nPriya takes the duplicate 09:05 entry. Demo build is cut on Friday noon.",
      created_at: "2026-11-10T09:05:00",
      updated_at: "2026-11-10T09:05:00",
      items: []
    },
    {
      id: "n-4ba2",
      wf: "i-2-0-2",
      text: "Books to read this winter\nLibrary card expires in January — renew before the holiday closure.",
      created_at: "2026-10-28T20:40:00",
      updated_at: "2026-11-08T21:10:00",
      items: [
        { id: "c-4ba2-1", note_id: "n-4ba2", text: "The Overstory — Richard Powers", checked: true, position: 0 },
        { id: "c-4ba2-2", note_id: "n-4ba2", text: "Em and the Big Hoom — Jerry Pinto", checked: true, position: 1 },
        { id: "c-4ba2-3", note_id: "n-4ba2", text: "The Dawn of Everything — Graeber & Wengrow", checked: false, position: 2 },
        { id: "c-4ba2-4", note_id: "n-4ba2", text: "Annihilation — Jeff VanderMeer", checked: false, position: 3 },
        { id: "c-4ba2-5", note_id: "n-4ba2", text: "Seeing Like a State — James C. Scott", checked: false, position: 4 }
      ]
    },
    {
      id: "n-2d55",
      wf: "i-2-0-3",
      text: "Flat keys are with the neighbour on the 3rd floor\nFlat 302, Mrs. Iyer. Ring twice — she leaves for her walk before 8am.",
      created_at: "2026-11-06T18:44:00",
      updated_at: "2026-11-06T18:44:00",
      items: []
    }
  ];

  let notes = $state(SEED);
  let query = $state("");
  let pending = $state(null);
  let flash = $state("");

  const sorted = $derived([...notes].sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1)));
  const q = $derived(query.trim().toLowerCase());
  const results = $derived(
    q
      ? sorted.filter(
          (n) => n.text.toLowerCase().includes(q) || n.items.some((i) => i.text.toLowerCase().includes(q))
        )
      : sorted
  );
  const pendingNote = $derived(notes.find((n) => n.id === pending) || null);

  function titleOf(note) {
    return note.text.split("\n")[0];
  }
  function bodyOf(note) {
    return note.text.split("\n").slice(1).join(" ").trim();
  }
  function doneCount(note) {
    return note.items.filter((i) => i.checked).length;
  }
  function fmt(iso) {
    const [d, t] = iso.split("T");
    const [y, m, day] = d.split("-");
    return `${Number(day)} ${MONTHS[Number(m) - 1]} ${y}, ${t.slice(0, 5)}`;
  }
  function metaOf(note) {
    const when = `updated ${fmt(note.updated_at)}`;
    return note.items.length ? `${doneCount(note)} of ${note.items.length} items done · ${when}` : when;
  }
  function markForDelete(note) {
    pending = note.id;
    flash = "";
  }
  function confirmDelete() {
    if (!pendingNote) return;
    const name = titleOf(pendingNote);
    notes = notes.filter((n) => n.id !== pending);
    pending = null;
    flash = `Deleted “${name}”. It is gone from this browser for good.`;
  }
</script>

<div class="pb-16" style="color: {brand.primaryColor}; font-family: {brand.fontBody};">
  <div class="grid grid-cols-12 items-end gap-6 pb-6" style="border-bottom: {thick};">
    <div class="col-span-12 md:col-span-8" data-wf="b-0-0">
      <p class="text-xs uppercase tracking-[0.2em]" style="font-family: {MONO}; color: {brand.neutralColor};">
        This browser only · Index
      </p>
      <h1
        class="mt-3 flex items-baseline gap-5 text-6xl font-bold leading-none tracking-tight md:text-7xl"
        style="font-family: {brand.fontHeading};"
      >
        Notes
        <span class="text-4xl md:text-5xl" style="font-variant-numeric: tabular-nums;"
          >{String(notes.length).padStart(2, "0")}</span
        >
      </h1>
    </div>
    <div class="col-span-12 md:col-span-4 md:justify-self-end">
      <Button
        data-wf="b-0-1"
        onclick={() => navigate('note-detail')}
        class="inline-flex w-full items-center justify-center gap-3 px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] transition-transform hover:-translate-x-1 hover:-translate-y-1 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] motion-reduce:transition-none motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0 md:w-auto"
        style="background-color: {brand.accentColor}; color: {brand.backgroundColor}; border: {thick}; border-radius: {brand.radius}; box-shadow: 6px 6px 0 {brand.primaryColor}; font-family: {MONO}; outline-color: {brand.primaryColor};"
      >
        <Icon name="Plus" class="h-5 w-5" aria-hidden="true" />
        New note
      </Button>
    </div>
  </div>

  <form
    data-wf="b-1-0"
    role="search"
    class="mt-10"
    onsubmit={(e) => e.preventDefault()}
  >
    <Label
      for="note-search"
      class="block text-xs font-bold uppercase tracking-[0.2em]"
      style="font-family: {MONO};">Search notes by text or checklist item</Label
    >
    <div
      class="mt-3 flex items-center gap-3 px-4"
      style="border: {thick}; border-radius: {brand.radius}; box-shadow: 6px 6px 0 {brand.primaryColor};"
    >
      <Icon name="Search" class="h-5 w-5 shrink-0" aria-hidden="true" />
      <Input
        id="note-search"
        type="search"
        bind:value={query}
        placeholder="groceries, standup, flat keys"
        class="w-full border-0 bg-transparent py-4 text-base focus:outline-none"
        style="font-family: {MONO}; color: {brand.primaryColor}; border-radius: {brand.radius};"
      />
      {#if query}
        <button
          type="button"
          aria-label="Clear search"
          onclick={() => (query = "")}
          class="flex h-11 w-11 shrink-0 items-center justify-center focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2"
          style="outline-color: {brand.accentColor};"
        >
          <Icon name="X" class="h-5 w-5" aria-hidden="true" />
        </button>
      {/if}
    </div>
    <p class="mt-3 text-xs uppercase tracking-[0.2em]" style="font-family: {MONO}; color: {brand.neutralColor};">
      Matching happens in this browser — no request leaves the device.
    </p>
  </form>

  <section data-wf="b-2-0" class="mt-12" aria-labelledby="notes-list-heading">
    <div class="flex flex-wrap items-baseline justify-between gap-3 pb-4" style="border-bottom: {thick};">
      <h2 id="notes-list-heading" class="text-2xl font-bold md:text-3xl" style="font-family: {brand.fontHeading};">
        Everything written down
      </h2>
      <p
        class="text-xs font-bold uppercase tracking-[0.2em]"
        style="font-family: {MONO}; font-variant-numeric: tabular-nums; color: {brand.neutralColor};"
        aria-live="polite"
      >
        {results.length} notes · newest first
      </p>
    </div>

    {#if results.length > 0}
      <ol class="mt-8 space-y-6">
        {#each results as note, index (note.id)}
          <li
            class="transition-transform hover:-translate-x-1 hover:-translate-y-1 focus-within:-translate-x-1 focus-within:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0"
            style="border: {thick}; border-radius: {brand.radius}; background-color: {brand.backgroundColor}; box-shadow: 6px 6px 0 {pending === note.id ? brand.accentColor : brand.primaryColor};"
          >
            <div class="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-4 p-5 md:gap-6">
              <span
                class="text-4xl font-bold leading-none md:text-5xl"
                style="font-family: {brand.fontHeading}; font-variant-numeric: tabular-nums;"
                aria-hidden="true">{String(index + 1).padStart(2, "0")}</span
              >
              <button
                type="button"
                data-wf={note.wf}
                onclick={() => navigate('note-detail')}
                class="text-left focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[6px]"
                style="outline-color: {brand.accentColor};"
              >
                <span class="block text-2xl font-bold leading-tight md:text-3xl" style="font-family: {brand.fontHeading};"
                  >{titleOf(note)}</span
                >
                <span
                  class="mt-2 block text-xs uppercase tracking-[0.12em]"
                  style="font-family: {MONO}; font-variant-numeric: tabular-nums;">{metaOf(note)}</span
                >
                {#if bodyOf(note)}
                  <span class="mt-2 block max-w-[62ch] text-sm leading-relaxed" style="color: {brand.neutralColor};"
                    >{bodyOf(note)}</span
                  >
                {/if}
              </button>
              <div class="flex flex-col items-end gap-3">
                <span
                  class="text-xs font-bold uppercase tracking-[0.2em]"
                  style="font-family: {MONO}; font-variant-numeric: tabular-nums; color: {brand.neutralColor};"
                >
                  {note.items.length ? `${doneCount(note)}/${note.items.length}` : "Text"}
                </span>
                <button
                  type="button"
                  aria-label={`Delete “${titleOf(note)}”`}
                  onclick={() => markForDelete(note)}
                  class="flex h-11 w-11 items-center justify-center transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 motion-reduce:transition-none"
                  style="border: {thick}; border-radius: {brand.radius}; outline-color: {brand.accentColor}; background-color: {pending === note.id ? brand.accentColor : 'transparent'}; color: {pending === note.id ? brand.backgroundColor : brand.primaryColor};"
                >
                  <Icon name="Trash" class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </li>
        {/each}
      </ol>
    {/if}
  </section>

  <section class="mt-10 grid grid-cols-12 gap-6" aria-labelledby="delete-heading">
    <div
      class="col-span-12 p-5 md:col-span-4"
      style="border: {thick}; border-radius: {brand.radius}; box-shadow: 6px 6px 0 {pendingNote ? brand.accentColor : brand.primaryColor};"
    >
      <h2
        id="delete-heading"
        class="text-xs font-bold uppercase tracking-[0.2em]"
        style="font-family: {MONO};"
      >
        Delete a note
      </h2>
      {#if pendingNote}
        <p class="mt-3 text-sm leading-relaxed">
          “{titleOf(pendingNote)}” will be wiped from this browser now. There is no trash and no undo.
        </p>
        <div class="mt-4 flex flex-wrap gap-3">
          <Button
            data-wf="b-3-0"
            onclick={confirmDelete}
            class="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] transition-transform hover:-translate-x-1 hover:-translate-y-1 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] motion-reduce:transition-none motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0"
            style="background-color: {brand.primaryColor}; color: {brand.backgroundColor}; border: {thick}; border-radius: {brand.radius}; box-shadow: 4px 4px 0 {brand.accentColor}; font-family: {MONO}; outline-color: {brand.accentColor};"
          >
            <Icon name="X" class="h-4 w-4" aria-hidden="true" />
            Delete
          </Button>
        </div>
      {:else}
        <p class="mt-3 text-sm leading-relaxed" aria-live="polite">
          {flash ? flash : "Choose the bin on a note to remove it. Deletions happen at once and cannot be recovered."}
        </p>
        <Button
          data-wf="b-3-0"
          disabled
          class="mt-4 inline-flex cursor-not-allowed items-center justify-center gap-2 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em]"
          style="background-color: transparent; color: {brand.neutralColor}; border: 3px dashed {brand.neutralColor}; border-radius: {brand.radius}; font-family: {MONO};"
        >
          <Icon name="X" class="h-4 w-4" aria-hidden="true" />
          Delete
        </Button>
      {/if}
    </div>
  </section>

  {#if notes.length === 0 || (q && results.length === 0)}
    <section class="mt-10 grid grid-cols-12 gap-6" aria-labelledby="nothing-heading">
      {#if notes.length === 0}
        <div
          data-wf="b-4-0"
          class="col-span-12 p-8 md:col-span-6"
          style="border: {thick}; border-radius: {brand.radius}; box-shadow: 6px 6px 0 {brand.primaryColor};"
        >
          <p class="text-xs font-bold uppercase tracking-[0.2em]" style="font-family: {MONO};">00 notes</p>
          <h2 id="nothing-heading" class="mt-3 text-3xl font-bold leading-tight md:text-4xl" style="font-family: {brand.fontHeading};">
            A blank page
          </h2>
          <p class="mt-3 max-w-[48ch] text-sm leading-relaxed" style="color: {brand.neutralColor};">
            No notes yet. Tap New note to capture your first thought.
          </p>
          <Button
            onclick={() => navigate('note-detail')}
            class="mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] transition-transform hover:-translate-x-1 hover:-translate-y-1 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] motion-reduce:transition-none motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0"
            style="background-color: {brand.accentColor}; color: {brand.backgroundColor}; border: {thick}; border-radius: {brand.radius}; box-shadow: 4px 4px 0 {brand.primaryColor}; font-family: {MONO}; outline-color: {brand.primaryColor};"
          >
            <Icon name="Plus" class="h-4 w-4" aria-hidden="true" />
            Create a note
          </Button>
        </div>
      {/if}

      {#if q && results.length === 0 && notes.length > 0}
        <div
          data-wf="b-4-1"
          class="col-span-12 p-8 md:col-span-6"
          style="border: {thick}; border-radius: {brand.radius}; box-shadow: 6px 6px 0 {brand.accentColor};"
        >
          <p class="text-xs font-bold uppercase tracking-[0.2em]" style="font-family: {MONO};">No match</p>
          <h2 id="nothing-heading" class="mt-3 text-3xl font-bold leading-tight md:text-4xl" style="font-family: {brand.fontHeading};">
            Nothing by that word
          </h2>
          <p class="mt-3 max-w-[48ch] text-sm leading-relaxed" style="color: {brand.neutralColor};">
            No notes match “{query.trim()}”. Clear the search to see all notes.
          </p>
          <Button
            onclick={() => (query = "")}
            class="mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px]"
            style="background-color: transparent; color: {brand.primaryColor}; border: {thick}; border-radius: {brand.radius}; font-family: {MONO}; outline-color: {brand.accentColor};"
          >
            <Icon name="X" class="h-4 w-4" aria-hidden="true" />
            Clear search
          </Button>
        </div>
      {/if}
    </section>
  {/if}

  <section data-wf="b-5-0" class="mt-14 pt-6" style="border-top: 3px dashed {brand.primaryColor};">
    <p class="max-w-[70ch] text-sm leading-relaxed" style="font-family: {MONO};">
      Your notes are saved only in this browser's local storage. No account, no server, and everything keeps working
      offline.
    </p>
    <p
      class="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em]"
      style="font-family: {MONO}; font-variant-numeric: tabular-nums; color: {brand.neutralColor};"
    >
      <Icon name="CheckCircle" class="h-4 w-4" aria-hidden="true" />
      Offline-ready · nothing to sync · last write 10 Nov 2026, 14:32
    </p>
  </section>
</div>
