<script>
  /* eslint-disable @typescript-eslint/no-unused-vars -- generated imports, matched generously */
  import { Button, Checkbox, Empty, Icon, Input, Label, Select, Textarea } from "@/lib/ui";
  import { brand } from "@/lib/brand";
  import { useNavigate } from "@/lib/navigate";

  const navigate = useNavigate();

  const noteId = '7f3c2a1b';
  const createdAt = '6 Nov 2026, 18:44';

  const ink = brand.primaryColor;
  const accent = brand.accentColor;
  const paper = brand.backgroundColor;
  const muted = brand.neutralColor;

  const hairline = `1px solid ${muted}40`;
  const rule = `3px solid ${ink}`;
  const block = `border: 3px solid ${ink}; border-radius: ${brand.radius}; background-color: ${paper}; box-shadow: 6px 6px 0 ${ink};`;

  let text = $state(
`Saturday market run — Jayanagar 4th Block.
Budget ₹1,200 all in, cash.

Ask at the Thindi stall whether the 7am kharabath batch is still
on. Collect the jute bag from the cobbler two shutters down — the
green one has a hole in the corner and the rice will go through it.`
  );

  let items = $state([
    { id: 'ck-01', note_id: noteId, text: 'Milk — 2 packets, toned', checked: true, position: 0, wf: 'i-2-0-0' },
    { id: 'ck-02', note_id: noteId, text: 'Brown bread', checked: true, position: 1, wf: 'i-2-0-1' },
    { id: 'ck-03', note_id: noteId, text: 'Tomatoes — 1 kg, the firm ones', checked: false, position: 2, wf: 'i-2-0-2' },
    { id: 'ck-04', note_id: noteId, text: 'Coffee beans — Araku dark roast', checked: false, position: 3, wf: 'i-2-0-3' },
    { id: 'ck-05', note_id: noteId, text: 'Dish soap refill', checked: true, position: 4, wf: null },
    { id: 'ck-06', note_id: noteId, text: 'Rice — 5 kg Sona Masoori', checked: true, position: 5, wf: null },
    { id: 'ck-07', note_id: noteId, text: 'Curd — 400 g', checked: false, position: 6, wf: null }
  ]);

  let newItem = $state('');
  let newItemError = $state('');
  let selectedId = $state(null);
  let lastAddedId = $state(null);
  let dirty = $state(false);
  let status = $state('idle'); // idle | saving | saved
  let updatedAt = $state('10 Nov 2026, 14:32');
  let announcement = $state('');
  let online = $state(true);
  let seq = 8;
  let saveTimer;

  const done = $derived(items.filter((i) => i.checked).length);
  const total = $derived(items.length);
  const selected = $derived(items.find((i) => i.id === selectedId) || null);
  const isBlank = $derived(text.trim() === '' && items.length === 0);

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  function stamp() {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}, ${hh}:${mm}`;
  }

  $effect(() => {
    if (typeof window === 'undefined') return;
    online = navigator.onLine !== false;
    const up = () => (online = true);
    const down = () => (online = false);
    window.addEventListener('online', up);
    window.addEventListener('offline', down);
    return () => {
      window.removeEventListener('online', up);
      window.removeEventListener('offline', down);
    };
  });

  $effect(() => () => clearTimeout(saveTimer));

  function markDirty() {
    dirty = true;
    status = 'idle';
  }

  function onToggle(item) {
    markDirty();
    announcement = item.checked
      ? `Ticked ${item.text}. ${done} of ${total} done.`
      : `Unticked ${item.text}. ${done} of ${total} done.`;
  }

  function addItem(event) {
    event.preventDefault();
    const value = newItem.trim();
    if (value === '') {
      newItemError = 'Type the item first — a blank line will not be saved.';
      return;
    }
    const item = {
      id: `ck-${String(seq++).padStart(2, '0')}`,
      note_id: noteId,
      text: value,
      checked: false,
      position: items.length
    };
    items = [...items, item];
    lastAddedId = item.id;
    newItem = '';
    newItemError = '';
    markDirty();
    announcement = `Added ${value} to the checklist. ${items.length} items.`;
  }

  function removeSelected() {
    if (!selected) return;
    const gone = selected.text;
    items = items.filter((i) => i.id !== selectedId).map((i, idx) => ({ ...i, position: idx }));
    selectedId = null;
    markDirty();
    announcement = `Removed ${gone}. ${items.length} items left.`;
  }

  function selectItem(id) {
    selectedId = selectedId === id ? null : id;
  }

  function focusNewItem() {
    const el = typeof document !== 'undefined' && document.getElementById('new-item');
    if (el) el.focus();
  }

  function saveNote() {
    status = 'saving';
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      status = 'saved';
      dirty = false;
      updatedAt = stamp();
      navigate('notes');
    }, 600);
  }

  function deleteNote() {
    navigate('notes');
  }
</script>

<div
  class="mx-auto w-full max-w-5xl px-4 pb-20 pt-8 sm:px-6 lg:px-8"
  style="font-family: {brand.fontBody}; color: {ink}; font-variant-numeric: tabular-nums;"
>
  <p aria-live="polite" class="sr-only">{announcement}</p>

  <!-- Row 1 -->
  <div class="grid grid-cols-12 items-start gap-4">
    <div class="col-span-2 sm:col-span-1">
      <button
        data-wf="b-0-0"
        type="button"
        aria-label="Back to notes"
        title="Back to notes"
        onclick={() => navigate('notes')}
        class="flex h-12 w-12 items-center justify-center transition-transform duration-150 hover:-translate-y-[2px] active:translate-x-[2px] active:translate-y-[2px] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] motion-reduce:transition-none"
        style="{block} outline-color: {accent};"
      >
        <Icon name="ArrowLeft" class="h-5 w-5" aria-hidden="true" />
      </button>
    </div>

    <div class="col-span-10 sm:col-span-7" data-wf="b-0-1">
      <p class="text-[11px] uppercase tracking-[0.3em]" style="color: {muted};">
        Note · ID {noteId}
      </p>
      <h1
        class="mt-1 text-[40px] leading-none sm:text-[52px]"
        style="font-family: {brand.fontHeading}; letter-spacing: -0.01em;"
      >
        Note
      </h1>
      <p class="mt-3 text-[13px] leading-relaxed" style="color: {muted};">
        Everything here is written to this browser as you work. There is no account and no server copy.
      </p>
    </div>

    <div class="col-span-12 sm:col-span-4">
      <Button
        data-wf="b-0-2"
        onclick={saveNote}
        disabled={status === 'saving'}
        class="flex h-14 w-full items-center justify-center gap-3 px-5 text-[13px] font-semibold uppercase tracking-[0.18em] transition-transform duration-150 hover:-translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px] disabled:cursor-wait disabled:opacity-80 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] motion-reduce:transition-none"
        style="background-color: {accent}; color: {paper}; border: 3px solid {ink}; border-radius: {brand.radius}; box-shadow: 6px 6px 0 {ink}; outline-color: {ink};"
      >
        <Icon name="Check" class="h-4 w-4" aria-hidden="true" />
        <span>{status === 'saving' ? 'Saving…' : 'Save note'}</span>
      </Button>

      <p class="mt-3 text-[11px] uppercase tracking-[0.18em]" style="color: {muted};">
        {#if status === 'saving'}
          <span class="motion-safe:animate-pulse">Writing to this browser…</span>
        {:else if isBlank}
          Empty note — it will be discarded, not listed.
        {:else if dirty}
          <span style="color: {ink};">● Unsaved edits · last written {updatedAt}</span>
        {:else}
          All changes written · {updatedAt}
        {/if}
      </p>
    </div>
  </div>

  <div class="mt-8" style="border-top: {rule};"></div>

  <!-- Row 2 -->
  <section class="mt-8" aria-labelledby="sec-text">
    <div class="flex items-baseline justify-between gap-4">
      <h2 id="sec-text" class="text-[12px] uppercase tracking-[0.3em]" style="color: {muted};">
        § 01 — Note text
      </h2>
      <span class="text-[11px] uppercase tracking-[0.18em]" style="color: {muted};">
        {text.trim().length} characters
      </span>
    </div>

    <div class="mt-4 p-4 sm:p-6" style="{block}">
      <Label for="note-text" class="block text-[12px] font-semibold uppercase tracking-[0.2em]">
        Note text
      </Label>
      <Textarea
        data-wf="b-1-0"
        id="note-text"
        rows="7"
        bind:value={text}
        oninput={markDirty}
        placeholder="Write the note here — plain text, no formatting needed."
        class="mt-3 w-full resize-y bg-transparent p-3 text-[14px] leading-7 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2"
        style="border: {hairline}; border-radius: {brand.radius}; color: {ink}; font-family: {brand.fontBody}; outline-color: {accent};"
      />
      <p class="mt-3 text-[12px]" style="color: {muted};">
        Plain text only. Images and file attachments are not supported.
      </p>
    </div>
  </section>

  <!-- Row 3 -->
  <section class="mt-10" aria-labelledby="sec-list" data-wf="b-2-0">
    <h2 id="sec-list" class="text-[12px] uppercase tracking-[0.3em]" style="color: {muted};">
      § 02 — Checklist
    </h2>

    <div class="mt-4" style="{block}">
      <div class="flex flex-wrap items-end justify-between gap-4 p-4 sm:p-6" style="border-bottom: {rule};">
        <h3 class="text-[26px] leading-none sm:text-[30px]" style="font-family: {brand.fontHeading};">
          Checklist — {done} of {total} done
        </h3>
        <div class="flex items-center gap-[3px]" aria-hidden="true">
          {#each items as item (item.id)}
            <span
              class="h-4 w-4 transition-colors duration-200 motion-reduce:transition-none"
              style="border: 1px solid {ink}; background-color: {item.checked ? accent : 'transparent'};"
            ></span>
          {/each}
        </div>
      </div>

      {#if items.length === 0}
        <div class="p-6">
          <Empty
            title="This note has no checklist yet"
            description="Add the first thing to do or pick up. Items save to this browser the moment you add them — offline included."
          >
            {#snippet action()}
              <Button
                onclick={focusNewItem}
                class="flex h-12 items-center gap-2 px-5 text-[12px] font-semibold uppercase tracking-[0.18em] transition-transform duration-150 active:translate-x-[2px] active:translate-y-[2px] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] motion-reduce:transition-none"
                style="background-color: {ink}; color: {paper}; border: 3px solid {ink}; border-radius: {brand.radius}; box-shadow: 4px 4px 0 {accent}; outline-color: {accent};"
              >
                <Icon name="Plus" class="h-4 w-4" aria-hidden="true" />
                Add the first item
              </Button>
            {/snippet}
          </Empty>
        </div>
      {:else}
        <ul class="divide-y" style="border-color: {muted}40;">
          {#each items as item, i (item.id)}
            <li
              class="flex flex-wrap items-center gap-x-4 gap-y-3 px-4 py-4 transition-colors duration-300 sm:px-6 motion-reduce:transition-none"
              style="border-left: 6px solid {item.id === selectedId ? accent : 'transparent'}; background-color: {item.id === lastAddedId ? accent + '12' : 'transparent'};"
            >
              <Checkbox
                data-wf={item.wf}
                id={'chk-' + item.id}
                bind:checked={items[i].checked}
                onchange={() => onToggle(items[i])}
                class="h-6 w-6 shrink-0 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2"
                style="border: 3px solid {ink}; border-radius: {brand.radius}; accent-color: {accent}; outline-color: {accent};"
              />
              <Label
                for={'chk-' + item.id}
                class="min-w-0 flex-1 cursor-pointer text-[14px] leading-6"
                style="text-decoration: {item.checked ? 'line-through' : 'none'}; color: {item.checked ? muted : ink};"
              >
                {item.text}
              </Label>

              <span class="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em]" style="color: {muted};">
                {#if item.checked}
                  <Icon name="Check" class="h-3.5 w-3.5" aria-hidden="true" />
                  Done
                {:else}
                  To do
                {/if}
              </span>

              <button
                type="button"
                aria-pressed={item.id === selectedId}
                onclick={() => selectItem(item.id)}
                class="h-11 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-150 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 motion-reduce:transition-none"
                style="border: {item.id === selectedId ? '3px solid ' + accent : '1px solid ' + muted + '80'}; border-radius: {brand.radius}; color: {item.id === selectedId ? accent : muted}; outline-color: {accent};"
              >
                {item.id === selectedId ? 'Selected' : 'Select'}
                <span class="sr-only"> — {item.text}, for removal</span>
              </button>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </section>

  <!-- Row 4 -->
  <div class="mt-6 grid grid-cols-12 items-center gap-4">
    <div class="col-span-12 sm:col-span-4">
      <Button
        data-wf="b-3-0"
        onclick={removeSelected}
        disabled={!selected}
        class="flex h-12 w-full items-center justify-center gap-2 px-4 text-[12px] font-semibold uppercase tracking-[0.18em] transition-transform duration-150 active:translate-x-[2px] active:translate-y-[2px] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] motion-reduce:transition-none"
        style="background-color: transparent; color: {ink}; border: 3px solid {ink}; border-radius: {brand.radius}; outline-color: {accent};"
      >
        <Icon name="X" class="h-4 w-4" aria-hidden="true" />
        Remove item
      </Button>
    </div>
    <p class="col-span-12 text-[12px] leading-5 sm:col-span-8" style="color: {muted};">
      {#if selected}
        Removing <span style="color: {ink};">“{selected.text}”</span>. The other {items.length - 1} items stay as they are.
      {:else}
        Choose <span class="uppercase tracking-[0.18em]">Select</span> on a line above, then remove it. Removal takes effect on save.
      {/if}
    </p>
  </div>

  <!-- Row 5 -->
  <form class="mt-8 grid grid-cols-12 items-end gap-4" onsubmit={addItem} novalidate>
    <div class="col-span-12 sm:col-span-8">
      <Label for="new-item" class="block text-[12px] font-semibold uppercase tracking-[0.2em]">
        New checklist item
      </Label>
      <Input
        data-wf="b-4-0"
        id="new-item"
        type="text"
        bind:value={newItem}
        oninput={() => (newItemError = '')}
        placeholder="e.g. Ginger — small piece"
        aria-invalid={newItemError ? 'true' : 'false'}
        aria-describedby="new-item-help"
        class="mt-3 h-12 w-full bg-transparent px-3 text-[14px] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2"
        style="border: 3px solid {newItemError ? accent : ink}; border-radius: {brand.radius}; color: {ink}; font-family: {brand.fontBody}; outline-color: {accent};"
      />
      <p id="new-item-help" class="mt-2 text-[12px]" style="color: {newItemError ? accent : muted};">
        {newItemError ? newItemError : 'Press Enter to add it to the bottom of the list.'}
      </p>
    </div>
    <div class="col-span-12 sm:col-span-4">
      <Button
        data-wf="b-4-1"
        type="submit"
        class="mb-7 flex h-12 w-full items-center justify-center gap-2 px-4 text-[12px] font-semibold uppercase tracking-[0.18em] transition-transform duration-150 hover:-translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] motion-reduce:transition-none"
        style="background-color: {ink}; color: {paper}; border: 3px solid {ink}; border-radius: {brand.radius}; box-shadow: 5px 5px 0 {accent}; outline-color: {accent};"
      >
        <Icon name="Plus" class="h-4 w-4" aria-hidden="true" />
        Add item
      </Button>
    </div>
  </form>

  <div class="mt-10" style="border-top: 1px dashed {muted};"></div>

  <!-- Row 6 -->
  <p data-wf="b-5-0" class="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2 text-[12px] leading-6" style="color: {muted};">
    <span class="inline-flex items-center gap-2 px-2 py-1 text-[11px] uppercase tracking-[0.18em]" style="border: 1px solid {muted}80; color: {ink};">
      <Icon name={online ? 'CheckCircle' : 'AlertCircle'} class="h-3.5 w-3.5" aria-hidden="true" />
      {online ? 'Local only · this browser' : 'Offline · still saving locally'}
    </span>
    <span>
      Created {createdAt} · Updated {updatedAt}. Saved straight to this browser, also when you are offline.
    </span>
  </p>

  <!-- Row 7 -->
  <div class="mt-8 grid grid-cols-12 gap-4">
    <div class="col-span-12 sm:col-span-5">
      <Button
        data-wf="b-6-0"
        onclick={deleteNote}
        class="flex h-12 w-full items-center justify-center gap-2 px-4 text-[12px] font-semibold uppercase tracking-[0.18em] transition-transform duration-150 active:translate-x-[2px] active:translate-y-[2px] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] motion-reduce:transition-none"
        style="background-color: transparent; color: {ink}; border: 3px dashed {ink}; border-radius: {brand.radius}; outline-color: {accent};"
      >
        <Icon name="Trash" class="h-4 w-4" aria-hidden="true" />
        Delete note (permanent)
      </Button>
      <p class="mt-2 text-[12px]" style="color: {muted};">
        There is no trash and no undo — the note leaves this browser for good.
      </p>
    </div>
  </div>
</div>
